export const extractErrorMessage = (
  error: unknown
): { message: string } | Record<string, unknown> => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response
  ) {
    return error.response.data as Record<string, unknown>;
  }
  return { message: "An unexpected error occurred" };
};
