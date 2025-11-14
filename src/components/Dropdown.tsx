"use client";

import type { CSSProperties, SelectHTMLAttributes } from "react";

const baseStyle: CSSProperties = {
  padding: "0.5rem",
  borderRadius: "0.375rem",
  border: "1px solid #d1d5db",
  backgroundColor: "#fff",
  minWidth: "12rem",
};

export type DropdownOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type DropdownProps = {
  options: DropdownOption[];
  placeholder?: string;
  style?: CSSProperties;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "style">;

export function Dropdown({ options, placeholder, style, ...selectProps }: DropdownProps) {
  return (
    <select {...selectProps} style={{ ...baseStyle, ...style }}>
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
}


