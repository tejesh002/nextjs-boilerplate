"use client";

import type { LabelHTMLAttributes, ReactNode } from "react";

type LabelProps = {
  text: ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ text, children, ...labelProps }: LabelProps) {
  return (
    <label {...labelProps} style={{ display: "inline-flex", flexDirection: "column", gap: "0.25rem" }}>
      <span style={{ fontWeight: 600 }}>{text}</span>
      {children ?? null}
    </label>
  );
}


