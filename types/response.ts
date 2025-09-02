export interface ApiResponse<T = unknown> {
  data: T;        // The actual response data, can be any type
  status: boolean; // True if request was successful
  message: string; // A message from the server
  code: number;    // Numeric status or error code
}