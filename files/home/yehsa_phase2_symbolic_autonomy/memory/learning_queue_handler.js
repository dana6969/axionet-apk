// Yehsa AGI – Learning Queue Handler (Symbolic Phase 2)
const fs = require("fs");
const path = require("path");

const queuePath = path.resolve(__dirname, "learning_queue.json");

// Load learning queue from disk
function loadQueue() {
  try {
    const data = fs.readFileSync(queuePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Save updated queue
function saveQueue(queue) {
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
}

// Add a new item to the queue if it’s not a duplicate or undefined
function addToLearningQueue(entry) {
  if (!entry || !entry.intent || entry.intent === "unknown") return false;

  const queue = loadQueue();
  const isDuplicate = queue.some(q =>
    q.intent === entry.intent &&
    JSON.stringify(q.context || {}) === JSON.stringify(entry.context || {})
  );

  if (!isDuplicate) {
    queue.push({
      ...entry,
      timestamp: new Date().toISOString(),
      status: "pending"
    });
    saveQueue(queue);
    return true;
  }

  return false;
}

// Remove by intent
function removeFromQueue(intent) {
  const queue = loadQueue();
  const filtered = queue.filter(q => q.intent !== intent);
  saveQueue(filtered);
}

// Get full queue
function getLearningQueue() {
  return loadQueue();
}

module.exports = {
  addToLearningQueue,
  removeFromQueue,
  getLearningQueue,
  loadQueue
};
