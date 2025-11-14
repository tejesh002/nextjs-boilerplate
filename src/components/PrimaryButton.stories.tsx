import type { Meta, StoryObj } from "@storybook/react";
import { PrimaryButton } from "./PrimaryButton";

const meta: Meta<typeof PrimaryButton> = {
  title: "Components/PrimaryButton",
  component: PrimaryButton,
  args: {
    label: "Primary Action",
  },
};

export default meta;

type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};


