"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import type { CheckboxOption } from "./CheckboxGroup";
import { CheckboxGroup } from "./CheckboxGroup";
import type { DropdownOption } from "./Dropdown";
import { Dropdown } from "./Dropdown";
import type { RadioOption } from "./RadioGroup";
import { RadioGroup } from "./RadioGroup";
import { PrimaryButton } from "./PrimaryButton";
import { TextInput } from "./TextInput";
import { NumberInput } from "./NumberInput";
import { ToggleSwitch } from "./ToggleSwitch";

type BaseField = {
  name: string;
  label: string;
  helperText?: string;
  required?: boolean;
};

type TextField = BaseField & {
  type: "text";
  placeholder?: string;
  defaultValue?: string;
};

type NumberField = BaseField & {
  type: "number";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
};

type SelectField = BaseField & {
  type: "select";
  options: DropdownOption[];
  placeholder?: string;
  defaultValue?: string;
};

type CheckboxField = BaseField & {
  type: "checkbox";
  options: CheckboxOption[];
  defaultValue?: string[];
  direction?: "vertical" | "horizontal";
};

type RadioField = BaseField & {
  type: "radio";
  options: RadioOption[];
  defaultValue?: string;
  direction?: "vertical" | "horizontal";
};

type ToggleField = BaseField & {
  type: "toggle";
  defaultValue?: boolean;
};

export type DynamicFormField =
  | TextField
  | NumberField
  | SelectField
  | CheckboxField
  | RadioField
  | ToggleField;

type DynamicFormProps = {
  fields: DynamicFormField[];
  onSubmit: (values: Record<string, unknown>) => void;
  submitLabel?: string;
  gap?: string;
};

export function DynamicForm({ fields, onSubmit, submitLabel = "Submit", gap = "1rem" }: DynamicFormProps) {
  const initialValues = useMemo(() => {
    const defaults: Record<string, unknown> = {};
    for (const field of fields) {
      switch (field.type) {
        case "checkbox":
          defaults[field.name] = field.defaultValue ?? [];
          break;
        case "toggle":
          defaults[field.name] = field.defaultValue ?? false;
          break;
        case "number":
          defaults[field.name] = field.defaultValue?.toString() ?? "";
          break;
        default:
          defaults[field.name] = field.defaultValue ?? "";
      }
    }
    return defaults;
  }, [fields]);

  const [values, setValues] = useState<Record<string, unknown>>(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const handleFieldChange = (name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedValues: Record<string, unknown> = {};
    for (const field of fields) {
      const rawValue = values[field.name];
      switch (field.type) {
        case "number": {
          const asString = typeof rawValue === "number" ? rawValue.toString() : (rawValue as string | undefined);
          if (asString === undefined || asString === "") {
            normalizedValues[field.name] = undefined;
            break;
          }
          const asNumber = Number(asString);
          normalizedValues[field.name] = Number.isNaN(asNumber) ? undefined : asNumber;
          break;
        }
        default:
          normalizedValues[field.name] = rawValue;
      }
    }

    onSubmit(normalizedValues);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap }}>
      {fields.map((field) => {
        switch (field.type) {
          case "text":
            return (
              <TextInput
                key={field.name}
                name={field.name}
                label={field.label}
                helperText={field.helperText}
                placeholder={field.placeholder}
                required={field.required}
                value={(values[field.name] as string) ?? ""}
                onChange={(event) => handleFieldChange(field.name, event.target.value)}
              />
            );
          case "number":
            return (
              <NumberInput
                key={field.name}
                name={field.name}
                label={field.label}
                helperText={field.helperText}
                placeholder={field.placeholder}
                required={field.required}
                min={field.min}
                max={field.max}
                step={field.step}
                value={(values[field.name] as string) ?? ""}
                onChange={(event) => handleFieldChange(field.name, event.target.value)}
              />
            );
          case "select":
            return (
              <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <label htmlFor={field.name} style={{ fontWeight: 600 }}>
                  {field.label}
                </label>
                <Dropdown
                  id={field.name}
                  name={field.name}
                  options={field.options}
                  placeholder={field.placeholder}
                  required={field.required}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(event) => handleFieldChange(field.name, event.target.value)}
                />
                {field.helperText && <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{field.helperText}</span>}
              </div>
            );
          case "checkbox":
            return (
              <Fragment key={field.name}>
                <span style={{ fontWeight: 600 }}>{field.label}</span>
                <CheckboxGroup
                  name={field.name}
                  options={field.options}
                  values={(values[field.name] as string[]) ?? []}
                  onChange={(nextValues) => handleFieldChange(field.name, nextValues)}
                  direction={field.direction}
                />
                {field.helperText && <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{field.helperText}</span>}
              </Fragment>
            );
          case "radio":
            return (
              <Fragment key={field.name}>
                <span style={{ fontWeight: 600 }}>{field.label}</span>
                <RadioGroup
                  name={field.name}
                  options={field.options}
                  value={(values[field.name] as string) ?? ""}
                  onChange={(nextValue) => handleFieldChange(field.name, nextValue)}
                  direction={field.direction}
                />
                {field.helperText && <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>{field.helperText}</span>}
              </Fragment>
            );
          case "toggle":
            return (
              <ToggleSwitch
                key={field.name}
                name={field.name}
                label={field.label}
                helperText={field.helperText}
                checked={Boolean(values[field.name])}
                onChange={(event) => handleFieldChange(field.name, event.target.checked)}
              />
            );
          default:
            return null;
        }
      })}
      <div>
        <PrimaryButton label={submitLabel} type="submit" />
      </div>
    </form>
  );
}


