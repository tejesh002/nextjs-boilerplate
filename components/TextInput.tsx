"use client";

import type { CSSProperties, InputHTMLAttributes } from "react";

const baseStyle: CSSProperties = {
  padding: "0.5rem",
  borderRadius: "0.375rem",
  border: "1px solid #d1d5db",
  width: "100%",
};

type TextInputProps = {
  label?: string;
  helperText?: string;
  containerStyle?: CSSProperties;
  inputStyle?: CSSProperties;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "style" | "type">;

export function TextInput({
  label,
  helperText,
  containerStyle,
  inputStyle,
  id,
  ...inputProps
}: TextInputProps) {
  const inputId = id ?? inputProps.name;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", ...containerStyle }}>
      {label && (
        <label htmlFor={inputId} style={{ fontWeight: 600 }}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type="text"
        {...inputProps}
        style={{ ...baseStyle, ...inputStyle }}
      />
      {helperText && <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{helperText}</span>}
    </div>
  );
}


