import "server-only";

export class ApiException extends Response {
  static Unauthorized(message?: string) {
    return new ApiException(message ?? "Unauthorized", { status: 401 });
  }
  static BadRequest(message?: string) {
    return new ApiException(message ?? "Bad Request", { status: 400 });
  }
  static NotFound(message?: string) {
    return new ApiException(message ?? "Not Found", { status: 404 });
  }
}
