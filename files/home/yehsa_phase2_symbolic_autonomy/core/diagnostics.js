// Yehsa AGI Diagnostics Module – Full Health Check
const fs = require("fs");
const path = require("path");

const paths = {
  memory: path.resolve(__dirname, "../memory/symbolic_memory.json"),
  triggers: path.resolve(__dirname, "../intents/symbolic_triggers.json"),
  unknownLog: path.resolve(__dirname, "../logs/symbolic_learning_log.json"),
  chainLog: path.resolve(__dirname, "../logs/chain_tasks.log"),
  reflectionLog: path.resolve(__dirname, "../logs/self_reflection.log")
};

// Check if a file exists and return basic info
function checkFileStatus(filePath) {
  const exists = fs.existsSync(filePath);
  let size = 0, lastModified = null;

  if (exists) {
    const stats = fs.statSync(filePath);
    size = stats.size;
    lastModified = stats.mtime.toISOString();
  }

  return { exists, size, lastModified };
}

// Run full diagnostics
function runDiagnostics() {
  const report = {
    timestamp: new Date().toISOString(),
    files: {}
  };

  for (const [key, filePath] of Object.entries(paths)) {
    report.files[key] = checkFileStatus(filePath);
  }

  try {
    const mem = JSON.parse(fs.readFileSync(paths.memory, "utf8"));
    const intents = JSON.parse(fs.readFileSync(paths.triggers, "utf8"));

    report.memoryEntries = mem.length;
    report.recentTriggers = intents.slice(-5).map(t => ({
      intent: t.intent,
      time: t.timestamp
    }));
  } catch (e) {
    report.error = `Failed to parse memory or triggers: ${e.message}`;
  }

  return report;
}

module.exports = {
  runDiagnostics
};
