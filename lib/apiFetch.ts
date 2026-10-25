export class HttpError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
    public retryAfter?: number,
  ) {
    super(message);
    this.name = "HttpError";
  }
}

function readToken() {
  if (typeof window === "undefined") return null;

  try {
    return JSON.parse(localStorage.getItem("auth") ?? "null")?.state?.token ?? null;
  } catch {
    return null;
  }
}

function clearAuth() {
  try {
    const auth = JSON.parse(localStorage.getItem("auth") ?? "null");
    if (auth?.state) {
      auth.state.token = null;
      auth.state.user = null;
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  } catch {
    // Ignore malformed local auth data.
  }
}

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, "") ?? "";
  if (!baseUrl && !/^https?:\/\//i.test(endpoint) && !endpoint.startsWith("/")) {
    throw new Error("Backend URL is not set");
  }

  const url = /^https?:\/\//i.test(endpoint)
    ? endpoint
    : baseUrl
      ? `${baseUrl}/${endpoint.replace(/^\/+/, "")}`
      : endpoint;

  const headers = new Headers(options.headers);
  headers.set("Accept", headers.get("Accept") ?? "application/json");

  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  if (isFormData) {
    headers.delete("Content-Type");
  } else if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const token = readToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, { ...options, headers });
  const contentType = response.headers.get("content-type") ?? "";
  const text = await response.text();
  let body: unknown = text;

  if (contentType.includes("application/json")) {
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = text;
    }
  }

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") clearAuth();

    const payload = body as { message?: string; error?: string } | null;
    const retryAfter = Number(response.headers.get("retry-after")) || undefined;
    const message =
      payload?.message ||
      payload?.error ||
      (response.status === 429
        ? "Too many requests. Please try again shortly."
        : response.statusText || "Request failed");

    throw new HttpError(
      response.status === 429 && retryAfter
        ? `${message} Try again in ${retryAfter}s.`
        : !contentType.includes("application/json") && text
          ? `${message} (HTTP ${response.status})`
          : message,
      response.status,
      body,
      retryAfter,
    );
  }

  return body as T;
}
