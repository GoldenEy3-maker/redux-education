import "server-only";

export class ApiException extends Response {
  static Unauthorized(message?: string) {
    return ApiException.json(
      { message: message ?? "Unauthorized" },
      { status: 401 },
    );
  }
  static BadRequest(message?: string) {
    return ApiException.json(
      { message: message ?? "Bad Request" },
      { status: 400 },
    );
  }
  static NotFound(message?: string) {
    return ApiException.json(
      { message: message ?? "Not Found" },
      { status: 404 },
    );
  }
}
