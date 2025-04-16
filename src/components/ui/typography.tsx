import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const createComponent = <T extends HTMLElement>(
  tag: keyof React.JSX.IntrinsicElements,
  defaultClassName: string,
  displayName: string
) => {
  const Component = forwardRef<T, React.HTMLAttributes<T>>(
    ({ className, ...props }, ref) => {
      return React.createElement(
        tag,
        { ...props, ref, className: cn(defaultClassName, className) },
        props.children
      );
    }
  );

  Component.displayName = displayName;
  return Component;
};

const H1 = createComponent<HTMLHeadingElement>(
  "h1",
  cn("text-4xl font-extrabold md:text-5xl"),
  "H1"
);

const H2 = createComponent<HTMLHeadingElement>(
  "h2",
  cn("text-3xl font-semibold md:text-4xl"),
  "H2"
);

const H3 = createComponent<HTMLHeadingElement>(
  "h3",
  cn("text-2xl font-semibold md:text-3xl"),
  "H3"
);

const H4 = createComponent<HTMLHeadingElement>(
  "h4",
  cn("text-xl font-semibold"),
  "H4"
);

const Lead = createComponent<HTMLParagraphElement>(
  "p",
  "text-xl text-muted-foreground",
  "Lead"
);

const P = createComponent<HTMLParagraphElement>("p", "", "P");

const Large = createComponent<HTMLDivElement>(
  "p",
  "text-lg font-semibold",
  "Large"
);

const Small = createComponent<HTMLParagraphElement>(
  "p",
  "text-sm font-medium",
  "Small"
);

const Muted = createComponent<HTMLSpanElement>(
  "span",
  "text-muted-foreground",
  "Muted"
);

export { H1, H2, H3, H4, Lead, P, Large, Small, Muted };
