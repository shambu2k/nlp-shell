export const cleanFormattedLlmCommandOutput = (code) => {
  return code
    .replace(/```/g, "")
    .replace(/bash/g, "")
    .replace(/\n/g, "")
    .trim();
};