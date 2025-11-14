import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./NumberInput";

const meta: Meta<typeof NumberInput> = {
  title: "Components/NumberInput",
  component: NumberInput,
  args: {
    name: "age",
    label: "Age",
    min: 0,
    max: 120,
    value: "",
  },
};

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? "");
    return (
      <NumberInput
        {...args}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          args.onChange?.(event);
        }}
      />
    );
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: "Must be between 18 and 65 to qualify.",
  },
  render: Default.render,
};


