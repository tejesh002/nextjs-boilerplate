"use client";

import type { ButtonHTMLAttributes, CSSProperties } from "react";

const baseStyle: CSSProperties = {
  padding: "0.5rem 1rem",
  borderRadius: "0.375rem",
  border: "none",
  backgroundColor: "#2563eb",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};

type PrimaryButtonProps = {
  label: string;
  style?: CSSProperties;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style" | "children">;

export function PrimaryButton({ label, style, ...buttonProps }: PrimaryButtonProps) {
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


