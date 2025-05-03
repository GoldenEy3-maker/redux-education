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

  if (!session?.user) {
    // return false;
    // return await signOut({ redirect: true });
    // throw new Error("Unauthorized");
    redirect(ROUTES_MAP.Login);
  }

  const apiService = new ApiService({
    ...config,
    accessToken: session.accessToken,
  });

  return new ApiClass(apiService);
}
