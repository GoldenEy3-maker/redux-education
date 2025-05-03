import { Api, ApiConfig } from "@/__generated__/Api";
import { ApiServiceConfig } from "./api-service-config";

export class ApiService<SecurityData = unknown> extends Api<SecurityData> {
  constructor(serviceConfig?: ApiServiceConfig) {
    const apiConfig: ApiConfig<SecurityData> = {
      baseApiParams: {
        headers: {},
      },
    };

    if (apiConfig.baseApiParams && serviceConfig?.accessToken)
      apiConfig.baseApiParams.headers = {
        Authorization: `Bearer ${serviceConfig.accessToken}`,
      };

    super(apiConfig);
  }
}
