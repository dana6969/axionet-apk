// Yehsa Phase 2 - Symbolic Learning Queue Handler
const fs = require("fs");
const path = require("path");

const queuePath = path.resolve(__dirname, "../memory/learning_queue.json");

/**
 * Load current symbolic learning queue.
 */
function loadLearningQueue() {
  try {
    const data = fs.readFileSync(queuePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("🛑 Failed to load learning queue:", err.message);
    return [];
  }
}

/**
 * Save updated learning queue.
 */
function saveLearningQueue(queue) {
  try {
    fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2), "utf-8");
    console.log("✅ Learning queue saved.");
  } catch (err) {
    console.error("🛑 Failed to save learning queue:", err.message);
  }
}

/**
 * Add a new symbolic entry to the queue.
 */
function queueLearning(intent, context = {}, metadata = {}) {
  const queue = loadLearningQueue();
  const entry = {
    timestamp: new Date().toISOString(),
    intent,
    context,
    status: "pending",
    metadata
  };

  const exists = queue.find(
    (item) =>
      item.intent === intent &&
      JSON.stringify(item.context) === JSON.stringify(context)
  );

  if (!exists) {
    queue.push(entry);
    saveLearningQueue(queue);
    console.log("📥 Queued new symbolic intent:", intent);
  } else {
    console.log("⚠️ Duplicate intent skipped:", intent);
  }
}

/**
 * Fetch unresolved entries for trainer to process.
 */
function getPendingEntries() {
  return loadLearningQueue().filter((item) => item.status === "pending");
}

module.exports = {
  loadLearningQueue,
  saveLearningQueue,
  queueLearning,
  getPendingEntries
};
