import { ClassConstructor } from "@/shared/types/class-constructor";
import { ApiService } from "../api-service";

export function createApiServerInstance<Api>(ApiClass: ClassConstructor<Api>) {
  const apiService = new ApiService();
  return new ApiClass(apiService);
}
