"use client";

import type { ButtonHTMLAttributes, CSSProperties } from "react";

const baseStyle: CSSProperties = {
  padding: "0.5rem 1rem",
  borderRadius: "0.375rem",
  border: "1px solid #2563eb",
  backgroundColor: "transparent",
  color: "#2563eb",
  fontWeight: 600,
  cursor: "pointer",
};

type SecondaryButtonProps = {
  label: string;
  style?: CSSProperties;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style" | "children">;

export function SecondaryButton({ label, style, ...buttonProps }: SecondaryButtonProps) {
  return (
    <button
      type="button"
      {...buttonProps}
      style={{ ...baseStyle, ...style }}
    >
      {label}
    </button>
  );
}


