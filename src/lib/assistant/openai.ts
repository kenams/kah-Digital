type OpenAIResponsePayload = {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
};

type OpenAIStreamEvent = {
  type?: string;
  delta?: string;
  response?: OpenAIResponsePayload;
};

const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const OPENAI_MODEL = process.env.OPENAI_ASSISTANT_MODEL ?? "gpt-5-mini";

function extractOutputText(payload: OpenAIResponsePayload) {
  if (payload.output_text && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const chunks =
    payload.output?.flatMap((item) =>
      item.content?.map((contentItem) => contentItem.text?.trim() ?? "").filter(Boolean) ?? []
    ) ?? [];

  return chunks.join("\n").trim();
}

export async function generateOpenAIJson<T>(params: {
  instructions: string;
  input: string;
}): Promise<T | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions: params.instructions,
      input: params.input,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`[openai] ${response.status} ${body}`.trim());
  }

  const payload = (await response.json()) as OpenAIResponsePayload;
  const text = extractOutputText(payload);
  if (!text) {
    return null;
  }

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  try {
    return JSON.parse(text.slice(start, end + 1)) as T;
  } catch {
    return null;
  }
}

function parseSseChunk(buffer: string) {
  const parts = buffer.split("\n\n");
  return {
    events: parts.slice(0, -1),
    rest: parts[parts.length - 1] ?? "",
  };
}

function extractSseData(block: string) {
  const lines = block
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean);

  const dataLines = lines
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim())
    .filter(Boolean);

  return dataLines.join("\n");
}

export async function streamOpenAIText(params: {
  instructions: string;
  input: string;
  onDelta: (delta: string) => void;
}): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const response = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions: params.instructions,
      input: params.input,
      stream: true,
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`[openai] ${response.status} ${body}`.trim());
  }

  if (!response.body) {
    return null;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      buffer += decoder.decode();
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const parsed = parseSseChunk(buffer);
    buffer = parsed.rest;

    for (const eventBlock of parsed.events) {
      const data = extractSseData(eventBlock);
      if (!data || data === "[DONE]") {
        continue;
      }

      let payload: OpenAIStreamEvent;
      try {
        payload = JSON.parse(data) as OpenAIStreamEvent;
      } catch {
        continue;
      }

      if (payload.type === "response.output_text.delta" && payload.delta) {
        fullText += payload.delta;
        params.onDelta(payload.delta);
        continue;
      }

      if (payload.type === "response.completed" && payload.response) {
        const completedText = extractOutputText(payload.response);
        if (completedText && !fullText.trim()) {
          fullText = completedText;
        }
      }

      if (payload.type === "error") {
        throw new Error("[openai] streaming error");
      }
    }
  }

  if (!fullText.trim() && buffer.trim()) {
    const data = extractSseData(buffer);
    if (data && data !== "[DONE]") {
      try {
        const payload = JSON.parse(data) as OpenAIStreamEvent;
        if (payload.type === "response.completed" && payload.response) {
          fullText = extractOutputText(payload.response);
        }
      } catch {
        // Ignore trailing parse errors.
      }
    }
  }

  return fullText.trim() ? fullText.trim() : null;
}
