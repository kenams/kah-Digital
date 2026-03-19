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
