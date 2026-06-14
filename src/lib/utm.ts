const SESSION_KEY = "kah_utm";

export type UtmData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
};

export function captureUtm(): void {
  if (typeof window === "undefined") return;
  // Only capture once per session
  if (sessionStorage.getItem(SESSION_KEY)) return;

  const params = new URLSearchParams(window.location.search);
  const data: UtmData = {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    referrer: document.referrer || undefined,
    landing_page: window.location.pathname,
  };
  // Only persist if there's something useful
  if (Object.values(data).some(Boolean)) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
  }
}

export function getUtm(): UtmData {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as UtmData) : {};
  } catch {
    return {};
  }
}
