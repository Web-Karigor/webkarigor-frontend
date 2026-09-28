import { useMutation } from "@tanstack/react-query";
import { apiFetch, HttpError } from "@/lib/apiFetch";

export type QuotationPayload = {
  package_id: number | null;
  service_id: number | null;
  name: string;
  email: string | null;
  phone: string;
  region: string | null;
  date: string | null;
  project_details: string | null;
  page: string | null;
  comment: string | null;
};

export type QuotationResponse = {
  success: boolean;
  message: string;
  data: QuotationPayload & {
    id: number;
    created_at: string;
    updated_at: string;
  };
};

function firstValidationMessage(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const errors = (body as { errors?: Record<string, string[] | string> }).errors;
  if (!errors) return null;

  const first = Object.values(errors)[0];
  if (Array.isArray(first) && first[0]) return first[0];
  if (typeof first === "string") return first;
  return null;
}

export function getQuotationErrorMessage(error: unknown) {
  if (error instanceof HttpError) {
    return firstValidationMessage(error.body) || error.message;
  }
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

export function useQuotationMutation() {
  return useMutation<QuotationResponse, Error, QuotationPayload>({
    mutationFn: (payload) => {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      return apiFetch<QuotationResponse>(`${origin}/api/quotation`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
  });
}
