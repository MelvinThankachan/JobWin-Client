import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { clashDisplay, jetBrainsMono } from "@/lib/fonts";

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
  cn("text-4xl font-extrabold lg:text-5xl", clashDisplay.className),
  "H1"
);

const H2 = createComponent<HTMLHeadingElement>(
  "h2",
  cn("text-3xl font-semibold lg:text-4xl", clashDisplay.className),
  "H2"
);

const H3 = createComponent<HTMLHeadingElement>(
  "h3",
  cn("text-2xl font-semibold lg:text-3xl", clashDisplay.className),
  "H3"
);

const H4 = createComponent<HTMLHeadingElement>(
  "h4",
  cn("text-xl font-semibold", clashDisplay.className),
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
  "text-sm text-muted-foreground",
  "Muted"
);

const InlineCode = createComponent<HTMLSpanElement>(
  "code",
  cn(
    "relative rounded bg-muted px-2 py-1 font-mono text-sm font-semibold",
    jetBrainsMono.className
  ),
  "InlineCode"
);

const MultilineCode = createComponent<HTMLPreElement>(
  "pre",
  "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold overflow-x-auto",
  "MultilineCode"
);

const Quote = createComponent<HTMLQuoteElement>(
  "blockquote",
  "border-l-2 pl-6 italic text-muted-foreground",
  "Quote"
);

export {
  H1,
  H2,
  H3,
  H4,
  Lead,
  P,
  Large,
  Small,
  Muted,
  InlineCode,
  MultilineCode,
  Quote,
};
