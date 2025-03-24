export class ApiException extends Response {
  static Unauthorized(message?: string) {
    return new ApiException(message ?? "Unauthorized", { status: 401 });
  }
}
