// Yehsa AGI Self-Reflection Module – Full Logic
const fs = require("fs");
const path = require("path");

const memoryPath = path.resolve(__dirname, "../memory/symbolic_memory.json");
const triggerPath = path.resolve(__dirname, "../intents/symbolic_triggers.json");
const logPath = path.resolve(__dirname, "../logs/chain_tasks.log");
const reflectionLogPath = path.resolve(__dirname, "../logs/self_reflection.log");

// Ensure necessary logs exist
function ensureFileExists(filePath, fallback = []) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(fallback, null, 2));
  }
}

// Load symbolic memory
function loadMemory() {
  ensureFileExists(memoryPath);
  return JSON.parse(fs.readFileSync(memoryPath, "utf8"));
}

// Load recent symbolic triggers
function loadRecentTriggers(limit = 10) {
  ensureFileExists(triggerPath);
  const data = JSON.parse(fs.readFileSync(triggerPath, "utf8"));
  return data.slice(-limit);
}

// Load chain execution log
function loadChainLog() {
  ensureFileExists(logPath);
  return fs.readFileSync(logPath, "utf8").split("\n").filter(Boolean);
}

// Generate reflection based on recent activity
function reflect() {
  const memory = loadMemory();
  const triggers = loadRecentTriggers();
  const logLines = loadChainLog();

  const insights = triggers.map((t, i) => {
    const matched = memory.find((m) => m.intent === t.intent);
    return {
      reflection_id: i + 1,
      trigger: t.intent,
      used_action: t.action || "none",
      memory_found: !!matched,
      suggestion: matched
        ? `Confirmed intent '${t.intent}' in memory.`
        : `Intent '${t.intent}' not found — consider adding.`,
    };
  });

  const entry = {
    timestamp: new Date().toISOString(),
    insights,
    recent_log_summary: logLines.slice(-5),
  };

  ensureFileExists(reflectionLogPath);
  const currentLog = JSON.parse(fs.readFileSync(reflectionLogPath, "utf8") || "[]");
  currentLog.push(entry);
  fs.writeFileSync(reflectionLogPath, JSON.stringify(currentLog, null, 2));

  return entry;
}

module.exports = {
  reflect,
};
