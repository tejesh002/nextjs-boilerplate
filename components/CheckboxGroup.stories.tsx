import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "./CheckboxGroup";

const meta: Meta<typeof CheckboxGroup> = {
  title: "Components/CheckboxGroup",
  component: CheckboxGroup,
  args: {
    name: "toppings",
    options: [
      { label: "Mushrooms", value: "mushrooms" },
      { label: "Onions", value: "onions" },
      { label: "Pepperoni", value: "pepperoni" },
    ],
    values: [],
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxGroup>;

export const Vertical: Story = {
  render: (args) => {
    const [values, setValues] = useState(args.values ?? []);
    return (
      <CheckboxGroup
        {...args}
        values={values}
        onChange={(next) => {
          setValues(next);
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


