import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import { TestButton as Button } from "./TestButton"

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
   title: "TEST/Button",
   component: Button,
   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
   argTypes: {
      buttonSize: ["small", "normal"]
   }
} as ComponentMeta<typeof Button>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
   buttonSize: "normal"
}
