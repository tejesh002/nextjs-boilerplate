"use client";

import type { InputHTMLAttributes } from "react";

type ToggleSwitchProps = {
  label?: string;
  helperText?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function ToggleSwitch({ label, helperText, id, ...inputProps }: ToggleSwitchProps) {
  const inputId = id ?? inputProps.name;

  return (
    <label htmlFor={inputId} style={{ display: "flex", flexDirection: "column", gap: "0.25rem", cursor: "pointer" }}>
      {label && <span style={{ fontWeight: 600 }}>{label}</span>}
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem" }}>
        <span
          style={{
            position: "relative",
            width: "3rem",
            height: "1.5rem",
            backgroundColor: inputProps.checked ? "#2563eb" : "#d1d5db",
            borderRadius: "9999px",
            transition: "background-color 0.2s ease",
          }}
        >
          <input
            id={inputId}
            type="checkbox"
            {...inputProps}
            style={{
              position: "absolute",
              opacity: 0,
              width: "100%",
              height: "100%",
              margin: 0,
              cursor: "pointer",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "0.125rem",
              left: inputProps.checked ? "1.5rem" : "0.125rem",
              width: "1.25rem",
              height: "1.25rem",
              borderRadius: "9999px",
              backgroundColor: "#fff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
              transition: "left 0.2s ease",
            }}
          />
        </span>
        <span>{inputProps.checked ? "On" : "Off"}</span>
      </span>
      {helperText && <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{helperText}</span>}
    </label>
  );
}


