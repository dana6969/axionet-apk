function processSymbolicInput(input) {
  if (!input || !input.intent) return "No intent provided";
  if (input.intent === "unknown") return "Aligned with intent: unknown";
  return `Processed intent: ${input.intent}`;
}

module.exports = { processSymbolicInput };
