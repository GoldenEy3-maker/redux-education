import { ApiService } from "@/shared/api/api-service";
import { EditProfileFormSchema } from "../model/edit-profile-form-schema";

export class UserApi {
  constructor(private readonly api: ApiService) {}

  async updateUser(data: EditProfileFormSchema) {
    const response = await this.api.v1.updateUser(data);
    return { data: response.data, error: response.error };
  }
}
