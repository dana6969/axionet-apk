// Yehsa Phase 2 – chainTaskScheduler.js
const fs = require("fs");
const path = require("path");

// Log path
const logPath = path.resolve(__dirname, "../../logs/chain_tasks.log");
// Symbolic memory store
const memoryPath = path.resolve(__dirname, "../memory/symbolic_memory.json");

// Create memory file if missing
function ensureMemoryFile() {
  if (!fs.existsSync(memoryPath)) {
    fs.writeFileSync(memoryPath, JSON.stringify({}, null, 2));
  }
}

// Log task execution
function logTask(message) {
  const time = new Date().toISOString();
  const line = `[${time}] ${message}\n`;
  fs.appendFileSync(logPath, line);
  console.log(line.trim());
}

// Write symbolic key/value to memory
function writeMemory(key, value) {
  ensureMemoryFile();
  const data = JSON.parse(fs.readFileSync(memoryPath, "utf8"));
  data[key] = value;
  fs.writeFileSync(memoryPath, JSON.stringify(data, null, 2));
  logTask(`🧠 Memory saved: ${key} = ${value}`);
}

// Main scheduler
async function scheduleChainedTasks(taskList = [], context = {}) {
  if (!Array.isArray(taskList) || taskList.length === 0) {
    logTask("⚠️ No symbolic tasks received.");
    return;
  }

  logTask(`🔗 Beginning chained execution of ${taskList.length} task(s).`);

  for (const task of taskList) {
    const intent = task.intent?.trim() || "none";
    const payload = task.payload || {};
    const session = context.session || "anonymous";

    try {
      logTask(`▶️ Processing [${intent}] from session: ${session}`);

      // Exact intent handlers
      if (intent === "log") {
        const msg = payload.message || "(No message provided)";
        logTask(`📝 [log] ${msg}`);

      } else if (intent === "saveMemory") {
        const key = payload.key || "undefined_key";
        const value = payload.value !== undefined ? payload.value : "(empty)";
        writeMemory(key, value);

      } else if (intent === "debug") {
        logTask("🧪 Debug task invoked.");
        console.dir({ context, payload });

      } else if (intent === "selfReflect") {
        logTask("🔮 Self-reflection logic executed.");
        // Insert self-analysis routines here

      } else if (intent === "runDiagnostics") {
        logTask("🛠️ System diagnostics triggered.");
        // Diagnostics code goes here

      } else if (intent === "nextPhase") {
        logTask("🚀 Triggering progression to next symbolic evolution phase.");
        // Transition signaling logic here

      } else {
        logTask(`⚠️ Intent [${intent}] is unsupported. Skipping.`);
      }

    } catch (err) {
      logTask(`❌ Exception in [${intent}]: ${err.message}`);
    }
  }

  logTask("✅ Chain completed for all symbolic tasks.");
}

module.exports = { scheduleChainedTasks };
