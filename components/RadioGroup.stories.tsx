import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  args: {
    name: "delivery",
    options: [
      { label: "Standard", value: "standard", helperText: "3-5 business days" },
      { label: "Express", value: "express", helperText: "1-2 business days" },
      { label: "Overnight", value: "overnight", helperText: "Next day" },
    ],
    value: "standard",
  },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Vertical: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? "");
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={(next) => {
          setValue(next);
          args.onChange?.(next);
        }}
      />
    );
  },
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
  },
  render: Vertical.render,
};


