import { ApiError } from "./api-errors";


export const formatApiErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: { data?: unknown } }).response?.data === "object" &&
    (error as { response: { data: unknown } }).response.data !== null &&
    "message" in ((error as { response: { data: Record<string, unknown> } }).response.data ?? {})
  ) {
    return (error as { response: { data: { message: string } } }).response.data.message;
  }

  if (typeof error === "object" && error !== null && "message" in error) {
    return (error as { message: string }).message;
  }

  return "An unexpected error occurred";
};
