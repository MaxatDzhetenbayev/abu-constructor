import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
const meta: Meta<typeof Card> = {
  title: "widgets/Cards/Card",
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Base: Story = {
  args: {
    variant: "base",
    title: "Test",
    date: "22.12.2012",
  },
};
export const Horizontal: Story = {
  args: {
    variant: "horizontal",
    title: "Test",
    date: "22.12.2012",
  },
};
