import LLM from "@themaximalist/llm.js";

export const getCommand = async (input) => {
  const llm = new LLM();
  llm.system("You are a bash command generator. I will provide you with natural language instructions, and your task is to output the corresponding bash command in raw text format without any additional formatting or explanatory text. Each command should be accurate and directly related to the input provided. Ensure that your output is strictly limited to the command itself as raw text, nothing else. Not even code formatting stuff with those backticks ```.");

  return await llm.chat(input, {service: "ollama", model: "qwen2.5-coder:1.5b"})
};