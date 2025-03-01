import { Badge } from "@/shared/ui/badge";

type ProductCompositionBadgeProps = {} & React.PropsWithChildren;

export function ProductCompositionBadge({
  children,
}: ProductCompositionBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="bg-secondary/40 change-theme-transition text-sm backdrop-blur-sm"
    >
      {children}
    </Badge>
  );
}
