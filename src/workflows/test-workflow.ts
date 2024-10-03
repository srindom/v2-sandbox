import {
  createStep,
  createWorkflow,
  StepResponse,
  WorkflowResponse,
} from "@medusajs/workflows-sdk"

const step1 = createStep("step-1", async () => {
  throw new Error("test")
  return new StepResponse(`Hello from step one!`)
})

const myWorkflow = createWorkflow("hello-world", function () {
  const str1 = step1()

  return new WorkflowResponse({
    message: str1,
  })
})

export default myWorkflow
