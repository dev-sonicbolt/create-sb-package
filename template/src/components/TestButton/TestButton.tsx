import { Button } from "@sonicbolt-dev/sonicboltui"
import React from "react"

// remove the lines below after verifying that the package builds successfully
// and replace with your required changes
const TestButton = ({ buttonSize }: { buttonSize: "small" | "normal" | undefined }) => {
   return <Button buttonSize={buttonSize}>Test Widget Button</Button>
}

export { TestButton }
