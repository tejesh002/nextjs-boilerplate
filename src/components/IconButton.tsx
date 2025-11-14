"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

const baseStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  padding: "0.5rem 0.75rem",
  borderRadius: "9999px",
  border: "none",
  backgroundColor: "#1f2937",
  color: "#fff",
  cursor: "pointer",
};

type IconButtonProps = {
  icon: ReactNode;
  label: string;
  style?: CSSProperties;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style" | "children">;

export function IconButton({ icon, label, style, ...buttonProps }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={buttonProps["aria-label"] ?? label}
      {...buttonProps}
      style={{ ...baseStyle, ...style }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}


