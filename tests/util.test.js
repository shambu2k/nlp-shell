import { cleanFormattedLlmCommandOutput } from '../src/util.js';

describe('cleanFormattedLlmCommandOutput', () => {
  it('removes triple backticks', () => {
    const input = "```some code```";
    const expectedOutput = "some code";
    expect(cleanFormattedLlmCommandOutput(input)).toBe(expectedOutput);
  });

  it('removes bash keyword', () => {
    const input = "```bash some code```";
    const expectedOutput = "some code";
    expect(cleanFormattedLlmCommandOutput(input)).toBe(expectedOutput);
  });

  it('removes newlines', () => {
    const input = "some\ncode";
    const expectedOutput = "somecode";
    expect(cleanFormattedLlmCommandOutput(input)).toBe(expectedOutput);
  });

  it('trims whitespace', () => {
    const input = "  some code  ";
    const expectedOutput = "some code";
    expect(cleanFormattedLlmCommandOutput(input)).toBe(expectedOutput);
  });
});