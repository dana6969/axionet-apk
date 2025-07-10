// Yehsa Phase 2 – autonomy_loop.js
const fs = require("fs");
const path = require("path");
const { scheduleChainedTasks } = require("./chainTaskScheduler");

const triggerPath = path.resolve(__dirname, "../../intents/symbolic_triggers.json");
const sessionID = `yehsa_session_${Date.now()}`;

// Ensure trigger file exists
function ensureTriggerFile() {
  if (!fs.existsSync(triggerPath)) {
    fs.writeFileSync(triggerPath, JSON.stringify([], null, 2));
  }
}

// Load symbolic triggers
function loadTriggers() {
  try {
    ensureTriggerFile();
    const data = fs.readFileSync(triggerPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("❌ Failed to load triggers:", err.message);
    return [];
  }
}

// Clear triggers after loop runs
function clearTriggers() {
  fs.writeFileSync(triggerPath, JSON.stringify([], null, 2));
}

// Run Yehsa’s symbolic task loop
async function runAutonomyLoop() {
  console.log(`\n🧠 [YEHSA] Autonomy Loop Started – Session: ${sessionID}`);

  const triggerQueue = loadTriggers();
  if (!Array.isArray(triggerQueue) || triggerQueue.length === 0) {
    console.log("📭 No symbolic tasks found. Loop ending.");
    return;
  }

  console.log(`📥 Found ${triggerQueue.length} symbolic task(s). Executing...`);

  await scheduleChainedTasks(triggerQueue, { session: sessionID });

  clearTriggers();
  console.log("🧠 Loop complete. Awaiting next symbolic input.");
}

runAutonomyLoop();
