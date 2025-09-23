export const extractErrorMessage = (error: any): any => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response
  ) {
    return error.response.data;
  }
  return { message: "An unexpected error occurred" };
};
