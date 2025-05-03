import { RefreshPayload } from "@/__generated__/Api";
import { LoginFormSchema } from "@/features/login-form";
import { ApiService } from "@/shared/api/api-service";

export class AuthApi {
  constructor(private readonly api: ApiService) {}

  async login(data: LoginFormSchema) {
    const response = await this.api.v1.login(data);
    return { data: response.data, error: response.error };
  }

  async refresh(data: RefreshPayload) {
    const response = await this.api.v1.refresh(data);
    return { data: response.data, error: response.error };
  }
}
