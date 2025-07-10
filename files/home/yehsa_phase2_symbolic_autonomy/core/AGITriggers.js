// Yehsa AGI Core Trigger Processor – Full Integration
const fs = require("fs");
const path = require("path");
const { handleInput } = require("./intent_parser");
const { reflect } = require("./self_reflect");
const { runDiagnostics } = require("./diagnostics");
const { learnFromQueue } = require("../memory/learning_queue_handler");

const triggerPath = path.resolve(__dirname, "../intents/symbolic_triggers.json");
const memoryPath = path.resolve(__dirname, "../memory/symbolic_memory.json");
const logPath = path.resolve(__dirname, "../logs/agi_trigger.log");
const diagnosticsPath = path.resolve(__dirname, "../logs/diagnostic_history.json");

function ensureFile(filePath, fallback = []) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
  }
}

function logEvent(type, content) {
  ensureFile(logPath);
  const currentLog = JSON.parse(fs.readFileSync(logPath, "utf8"));
  currentLog.push({
    timestamp: new Date().toISOString(),
    type,
    content,
  });
  fs.writeFileSync(logPath, JSON.stringify(currentLog, null, 2));
}

function triggerAGI(userInput) {
  const parsed = handleInput(userInput);
  const diagnostics = runDiagnostics();
  const reflection = reflect();
  learnFromQueue(); // Learn passively if any unknowns are queued

  const response = {
    input: userInput,
    parsed,
    system: {
      diagnostics,
      reflection,
    },
    next_steps: [],
  };

  if (parsed.intent === "unknown") {
    response.next_steps.push("Logged as unrecognized. Awaiting labeling or training.");
  } else {
    response.next_steps.push(`Proceed with action: ${parsed.action || "no specific action"}`);
  }

  logEvent("AGI_trigger", response);
  return response;
}

module.exports = {
  triggerAGI,
};
