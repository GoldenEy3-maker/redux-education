import { useAppSelector } from "@/shared/lib/store-hooks";
import { selectSession } from "@/shared/model/auth-selectors";

export function useSession() {
  return useAppSelector(selectSession);
}
