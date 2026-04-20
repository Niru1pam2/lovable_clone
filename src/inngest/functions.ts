// src/inngest/functions.ts
import { createAgent, gemini } from "@inngest/agent-kit";
import { inngest } from "./client";

export const processTask = inngest.createFunction(
  { id: "process-task", triggers: { event: "app/task.created" } },
  async ({ event, step }) => {
    await step.sleep("pause", "1s");

    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert next.js developer.  You write readable, maintainable code. You write simple next.js & React snippets.",
      model: gemini({ model: "gemini-3.1-flash-lite-preview" }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`,
    );

    console.log(output);

    return { output };
  },
);
