import { HttpError } from "@/lib/apiFetch";

/** Retry transient failures, but do not repeat permanent client errors. */
export function retryTransientQueryError(
  failureCount: number,
  error: Error,
) {
  if (
    error instanceof HttpError &&
    error.status >= 400 &&
    error.status < 500 &&
    error.status !== 408 &&
    error.status !== 429
  ) {
    return false;
  }

  return failureCount < 3;
}
