const fs = require('fs');
const path = require('path');

const triggersPath = path.resolve(__dirname, '../intents/symbolic_triggers.json');
const memoryPath = path.resolve(__dirname, '../memory/symbolic_memory.json');
const logPath = path.resolve(__dirname, '../logs/symbolic_learning_log.json');

function log(message) {
  console.log(`[TRAINER] ${message}`);
}

function ensureFile(filePath, defaultContent) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, defaultContent, 'utf8');
  }
}

function loadJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return [];
  }
}

function saveJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function isValidEntry(entry) {
  return typeof entry === 'object' &&
         typeof entry.trigger === 'string' &&
         typeof entry.action === 'string';
}

function train() {
  ensureFile(triggersPath, '[]');
  ensureFile(memoryPath, '[]');
  ensureFile(logPath, '[]');

  const triggers = loadJSON(triggersPath);
  const memory = loadJSON(memoryPath);
  const logs = loadJSON(logPath);

  let added = 0;

  for (const entry of triggers) {
    if (!isValidEntry(entry)) {
      log(`Skipped invalid entry: ${JSON.stringify(entry)}`);
      continue;
    }

    const exists = memory.some(mem => mem.trigger === entry.trigger);
    if (!exists) {
      memory.push(entry);
      logs.push({ event: 'added', data: entry, time: new Date().toISOString() });
      added++;
    } else {
      log(`Already exists: ${entry.trigger}`);
    }
  }

  saveJSON(memoryPath, memory);
  saveJSON(logPath, logs);

  console.log(`{ added: ${added}, entries: ${memory.length} }`);
}

train();
