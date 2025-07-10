// Yehsa AGI Intent Parser – Full Version
const fs = require("fs");
const path = require("path");

const triggerPath = path.resolve(__dirname, "../intents/symbolic_triggers.json");
const memoryPath = path.resolve(__dirname, "../memory/symbolic_memory.json");
const unknownLogPath = path.resolve(__dirname, "../logs/symbolic_learning_log.json");

// Ensure all storage files exist
function ensureFileExists(filePath, fallback = []) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
  }
}

// Load symbolic memory
function loadSymbolicMemory() {
  ensureFileExists(memoryPath);
  return JSON.parse(fs.readFileSync(memoryPath, "utf8"));
}

// Load incoming symbolic input (raw user intent or log)
function parseInput(inputText) {
  const memory = loadSymbolicMemory();
  const match = memory.find((entry) =>
    entry.phrases.some((phrase) => inputText.toLowerCase().includes(phrase.toLowerCase()))
  );

  if (match) {
    return {
      intent: match.intent,
      confidence: "high",
      action: match.action || null,
    };
  } else {
    logUnknownIntent(inputText);
    return {
      intent: "unknown",
      confidence: "low",
      action: null,
    };
  }
}

// Log unknown input to symbolic_learning_log.json
function logUnknownIntent(text) {
  ensureFileExists(unknownLogPath);
  const current = JSON.parse(fs.readFileSync(unknownLogPath, "utf8"));
  current.push({
    timestamp: new Date().toISOString(),
    text,
    status: "unrecognized",
  });
  fs.writeFileSync(unknownLogPath, JSON.stringify(current, null, 2));
}

// Queue parsed intent
function queueIntent(parsed) {
  if (parsed.intent === "unknown") return;
  ensureFileExists(triggerPath);
  const current = JSON.parse(fs.readFileSync(triggerPath, "utf8"));
  current.push({
    intent: parsed.intent,
    action: parsed.action,
    timestamp: new Date().toISOString(),
  });
  fs.writeFileSync(triggerPath, JSON.stringify(current, null, 2));
}

// Entry point: receives user input
function handleInput(inputText) {
  const parsed = parseInput(inputText);
  queueIntent(parsed);
  return parsed;
}

module.exports = {
  handleInput,
};
