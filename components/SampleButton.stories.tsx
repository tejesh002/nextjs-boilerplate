import type { Meta, StoryObj } from "@storybook/react";
import { SampleButton } from "./SampleButton";

const meta: Meta<typeof SampleButton> = {
  title: "Components/SampleButton",
  component: SampleButton,
  args: {
    label: "Click me",
  },
};

export default meta;

type Story = StoryObj<typeof SampleButton>;

export const Default: Story = {};


