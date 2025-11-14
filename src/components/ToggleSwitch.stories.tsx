import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ToggleSwitch } from "./ToggleSwitch";

const meta: Meta<typeof ToggleSwitch> = {
  title: "Components/ToggleSwitch",
  component: ToggleSwitch,
  args: {
    name: "notifications",
    label: "Email notifications",
    checked: false,
  },
};

export default meta;

type Story = StoryObj<typeof ToggleSwitch>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return (
      <ToggleSwitch
        {...args}
        checked={checked}
        onChange={(event) => {
          setChecked(event.target.checked);
          args.onChange?.(event);
        }}
      />
    );
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: "Toggle to receive weekly updates.",
  },
  render: Default.render,
};


