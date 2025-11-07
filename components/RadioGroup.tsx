"use client";

import type { ChangeEvent } from "react";

export type RadioOption = {
  label: string;
  value: string;
  helperText?: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  direction?: "vertical" | "horizontal";
};

export function RadioGroup({ name, options, value, onChange, direction = "vertical" }: RadioGroupProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div style={{ display: "flex", flexDirection: direction === "horizontal" ? "row" : "column", gap: "0.5rem" }}>
      {options.map((option) => {
        const id = `${name}-${option.value}`;
        return (
          <label key={option.value} htmlFor={id} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <input
                id={id}
                name={name}
                type="radio"
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                disabled={option.disabled}
              />
              {option.label}
            </span>
            {option.helperText && <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{option.helperText}</span>}
          </label>
        );
      })}
    </div>
  );
}


