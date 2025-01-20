import LLM from "@themaximalist/llm.js";

const cleanFormattedLlmCommandOutput = (code) => {
  return code
    .replace(/```/g, "")
    .replace(/bash/g, "")
    .replace(/\n/g, "")
    .trim();
};

export const getCommand = async (input, osType) => {
  const llm = new LLM();
  llm.system(
    `You are a bash command generator for ${osType}. Upon receiving natural language instructions, your task is to generate the exact corresponding bash command in plain text format. The output should solely consist of the command itself without any additional explanations, formatting, or extra text. Each command must be precise and directly associated with the input given. Maintain clarity and avoid any form of coding language formatting. If you feel the task cannot be accomplished with a single command, chain the multiple commands into a single line with && or &.`
  );

  const llmOutput = await llm.chat(input, {
    service: "ollama",
    model: "qwen2.5-coder:1.5b",
  });

  return cleanFormattedLlmCommandOutput(llmOutput);
};