import { ApiService } from "../api-service";
import { ApiServiceConfig } from "../api-service-config";
import { ClassConstructor } from "@/shared/types/class-constructor";
import { auth } from "@/shared/auth";
import { redirect } from "next/navigation";
import { ROUTES_MAP } from "@/shared/constants/routes";

export async function createProtectedApiServerInstance<Api>(
  ApiClass: ClassConstructor<Api>,
  config?: ApiServiceConfig,
) {
  const session = await auth();

  // Using redirect insted of singOut caz it's not working in server components
  if (!session?.user) redirect(ROUTES_MAP.Login);

  const apiService = new ApiService({
    ...config,
    accessToken: session.accessToken,
  });

  return new ApiClass(apiService);
}
