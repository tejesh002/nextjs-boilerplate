import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  args: {
    text: "Email",
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: (args) => (
    <Label {...args}>
      <input type="email" placeholder="you@example.com" />
    </Label>
  ),
};

export const WithHelper: Story = {
  args: {
    text: "Username",
  },
  render: (args) => (
    <Label {...args}>
      <>
        <input type="text" placeholder="Choose a username" />
        <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>3-16 characters</span>
      </>
    </Label>
  ),
};


