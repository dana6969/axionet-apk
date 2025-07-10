// Yehsa AGI – Symbolic Memory Utilities
const fs = require("fs");
const path = require("path");

const memoryPath = path.resolve(__dirname, "../memory/symbolic_memory.json");

// Load memory or initialize if not found
function loadMemory() {
  try {
    const raw = fs.readFileSync(memoryPath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return [];
  }
}

// Save updated memory
function saveMemory(memoryArray) {
  fs.writeFileSync(memoryPath, JSON.stringify(memoryArray, null, 2));
}

// Check if symbolic intent is novel (no duplicate message/intents)
function isNewMemory(memoryArray, entry) {
  return !memoryArray.some(mem => 
    mem.intent === entry.intent &&
    JSON.stringify(mem.context || {}) === JSON.stringify(entry.context || {})
  );
}

// Append symbolic memory entry (timestamped + filtered)
function appendSymbolicMemory(entry) {
  const memory = loadMemory();

  if (!entry || !entry.intent) return false;

  const enrichedEntry = {
    ...entry,
    timestamp: new Date().toISOString()
  };

  if (isNewMemory(memory, enrichedEntry)) {
    memory.push(enrichedEntry);
    saveMemory(memory);
    return true;
  }

  return false; // duplicate or invalid
}

module.exports = {
  loadMemory,
  saveMemory,
  appendSymbolicMemory,
  isNewMemory
};
