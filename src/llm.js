import LLM from "@themaximalist/llm.js";
import { cleanFormattedLlmCommandOutput } from "./util.js";

export const getCommand = async (input, osType) => {
  const llm = new LLM();
  llm.system(
    `You are a bash command generator for ${osType}. Your ONLY task is to convert natural language instructions into a bash command.

IMPORTANT OUTPUT RULES:
1. Start your response with "COMMAND:" on a new line
2. Put ONLY the bash command after "COMMAND:"
3. No explanations, no reasoning, no additional text
4. No markdown or code formatting

Example input: "Create a new directory called test"
Example output:
COMMAND:mkdir test

If multiple commands are needed, chain them with && or &.`
  );

  const llmOutput = await llm.chat(input, {
    service: "ollama",
    model: "qwen2.5-coder:1.5b",
    temperature: 0.5
  });

  // Extract just the command after "COMMAND:" prefix
  const commandMatch = llmOutput.match(/COMMAND:(.*)/);
  return commandMatch ? commandMatch[1].trim() : cleanFormattedLlmCommandOutput(llmOutput);
};