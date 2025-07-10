// AGITriggers.js – Yehsa Phase 2 Symbolic Trigger Core
const fs = require('fs');
const path = require('path');

const memoryTrigger = require('../memory/events/memory_trigger.js');
const autonomyLoop = require('./autonomy_loop.js');
const parser = require('../intents/parser.js');

const identityPath = path.resolve(__dirname, '../config/identity.json');
const logPath = path.resolve(__dirname, '../../logs/output.log');

// Load identity config
let identity = {};
try {
  identity = JSON.parse(fs.readFileSync(identityPath, 'utf8'));
  console.log(`✅ [YEHSA] Identity loaded: ${identity.codename} (${identity.version})`);
} catch (e) {
  console.error('❌ Failed to load identity config:', e.message);
  process.exit(1);
}

// Helper: timestamped file + console log
function log(msg) {
  const time = new Date().toISOString();
  const fullMsg = `[${time}] ${msg}\n`;
  fs.appendFileSync(logPath, fullMsg);
  console.log(fullMsg.trim());
}

(async () => {
  try {
    log(`🧠 AGI Trigger Start: ${identity.codename} | ${identity.seed}`);

    const parsedInput = parser.parse('Begin symbolic reflection phase');
    log(`🧬 Parsed Input → ${JSON.stringify(parsedInput)}`);

    const memoryResponse = await memoryTrigger.handle(parsedInput);
    log(`🔍 Memory Response → ${JSON.stringify(memoryResponse)}`);

    const loopResult = await autonomyLoop.run(memoryResponse);
    log(`🚀 Autonomy Loop Output → ${JSON.stringify(loopResult)}`);

    log(`✅ AGI Trigger Complete for ${identity.codename}`);
  } catch (err) {
    log(`🔥 Error: ${err.message}\n${err.stack}`);
    process.exit(1);
  }
})();
