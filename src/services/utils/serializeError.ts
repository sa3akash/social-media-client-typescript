import { AxiosError } from "axios";

interface SerializedError {
  message: string;
  status: string;
  statusCode: number;
}

export function axiosError(error: AxiosError): SerializedError {
  const message =
    (error.response?.data as { message: string })?.message || error.message;
  const status =
    (error.response?.data as { status: string })?.status || "error";
  const statusCode = error.response?.status || 500;
  return { message, status, statusCode };
}
