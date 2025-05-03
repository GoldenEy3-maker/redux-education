import { ApiService } from "@/shared/api/api-service";
import { RegisterFormSchema } from "../model/register-form-schema";

export class RegisterApi {
  constructor(private readonly api: ApiService) {}

  async register(data: RegisterFormSchema) {
    const response = await this.api.v1.register(data);

    return {
      data: response.data?.message,
      error: response.error?.message,
      errorFields: response.error?.fields,
    };
  }
}
