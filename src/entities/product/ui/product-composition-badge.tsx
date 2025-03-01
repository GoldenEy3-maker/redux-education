import { Badge } from "@/shared/ui/badge";

type ProductCompositionBadgeProps = {} & React.PropsWithChildren;

export function ProductCompositionBadge({
  children,
}: ProductCompositionBadgeProps) {
  return (
    <Badge
      variant="outline"
      className="bg-secondary/40 text-sm backdrop-blur-sm"
    >
      {children}
    </Badge>
  );
}
