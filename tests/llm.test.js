import { getCommand } from '../src/llm.js';

describe('LLM functionality', () => {
  it('should generate a command based on input and osType', async () => {
    const input = "list files";
    const osType = "Linux";
    const command = await getCommand(input, osType);
    expect(command).toBe("ls");
  });
});