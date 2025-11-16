import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  component: TextInput,
  args: {
    name: "firstName",
    label: "First name",
    placeholder: "Jane",
    value: "",
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

const DefaultStory = (args: React.ComponentProps<typeof TextInput>) => {
  const [value, setValue] = useState(args.value ?? "");
  return (
    <TextInput
      {...args}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        args.onChange?.(event);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <DefaultStory {...args} />,
};

export const WithHelperText: Story = {
  args: {
    helperText: "We will only use this to contact you about your order.",
  },
  render: Default.render,
};


