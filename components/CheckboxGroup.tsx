"use client";

import { useCallback } from "react";
import type { ChangeEvent } from "react";

export type CheckboxOption = {
  label: string;
  value: string;
  helperText?: string;
  disabled?: boolean;
};

type CheckboxGroupProps = {
  name: string;
  options: CheckboxOption[];
  values: string[];
  onChange: (values: string[]) => void;
  direction?: "vertical" | "horizontal";
};

export function CheckboxGroup({ name, options, values, onChange, direction = "vertical" }: CheckboxGroupProps) {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = event.target;
      if (checked) {
        onChange(Array.from(new Set([...values, value])));
      } else {
        onChange(values.filter((selected) => selected !== value));
      }
    },
    [onChange, values]
  );

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
                type="checkbox"
                value={option.value}
                checked={values.includes(option.value)}
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


