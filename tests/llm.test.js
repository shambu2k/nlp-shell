import { getCommand } from '../src/llm.js';

describe('LLM command generation', () => {
  it('should generate a command based on input and osType', async () => {
    const input = "list files";
    const osType = "Linux";
    const command = await getCommand(input, osType);
    expect(['ls', 'ls -l']).toContain(command);
  }, 15000);
});