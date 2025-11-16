import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DynamicForm } from "./DynamicForm";

const meta: Meta<typeof DynamicForm> = {
  title: "Components/DynamicForm",
  component: DynamicForm,
  args: {
    submitLabel: "Create account",
    fields: [
      {
        type: "text",
        name: "fullName",
        label: "Full name",
        placeholder: "Jane Doe",
        required: true,
      },
      {
        type: "number",
        name: "teamSize",
        label: "Team size",
        helperText: "How many people are on your team?",
        min: 1,
        max: 500,
        required: true,
      },
      {
        type: "select",
        name: "plan",
        label: "Plan",
        placeholder: "Choose a plan",
        options: [
          { label: "Starter", value: "starter" },
          { label: "Growth", value: "growth" },
          { label: "Enterprise", value: "enterprise" },
        ],
        required: true,
      },
      {
        type: "checkbox",
        name: "integrations",
        label: "Integrations",
        helperText: "Select all that apply",
        options: [
          { label: "Slack", value: "slack" },
          { label: "GitHub", value: "github" },
          { label: "Salesforce", value: "salesforce" },
        ],
      },
      {
        type: "radio",
        name: "billing",
        label: "Billing cycle",
        options: [
          { label: "Monthly", value: "monthly" },
          { label: "Yearly", value: "yearly" },
        ],
        defaultValue: "monthly",
      },
      {
        type: "toggle",
        name: "marketingOptIn",
        label: "Receive product updates",
        helperText: "You can unsubscribe at any time.",
      },
    ],
    onSubmit: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof DynamicForm>;

const PlaygroundStory = (args: React.ComponentProps<typeof DynamicForm>) => {
  const [submitted, setSubmitted] = useState<Record<string, unknown> | null>(null);

  return (
    <div style={{ maxWidth: "28rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <DynamicForm
        {...args}
        onSubmit={(values) => {
          args.onSubmit?.(values);
          setSubmitted(values);
        }}
      />
      {submitted && (
        <pre
          style={{
            margin: 0,
            padding: "1rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
          }}
        >
          {JSON.stringify(submitted, null, 2)}
        </pre>
      )}
    </div>
  );
};

export const Playground: Story = {
  render: (args) => <PlaygroundStory {...args} />,
};


