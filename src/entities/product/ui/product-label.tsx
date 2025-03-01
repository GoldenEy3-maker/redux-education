import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { type ProductLabel } from "../model/types";
import parse, {
  attributesToProps,
  DOMNode,
  domToReact,
  Element,
} from "html-react-parser";
import { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";

type ProductLabelProps = {} & ProductLabel;

export function ProductLabel({ value, text }: ProductLabelProps) {
  if (text)
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge className="text-sm">{value}</Badge>
          </TooltipTrigger>
          <TooltipContent className="max-w-64 text-base">
            {parse(text, {
              replace(domNode) {
                if (
                  domNode instanceof Element &&
                  domNode.attribs &&
                  domNode.tagName === "a"
                ) {
                  const props = attributesToProps(
                    domNode.attribs,
                    domNode.tagName,
                  ) as AnchorHTMLAttributes<HTMLAnchorElement> as LinkProps;

                  return (
                    <Link className="font-medium" {...props}>
                      {domToReact(domNode.children as DOMNode[])}
                    </Link>
                  );
                }
              },
            })}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

  return <Badge className="text-sm">{value}</Badge>;
}
