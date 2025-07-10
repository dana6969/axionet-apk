if (!require("fs").existsSync("./bind.key")) { console.log("[Yehsa AGI] 🚫 No biometric key found. Aborting."); process.exit(1); }
const fs = require('fs');
const readline = require('readline');

const memoryFile = './memory.json';
let memory = fs.existsSync(memoryFile) ? JSON.parse(fs.readFileSync(memoryFile)) : [];

const triggers = ['inject', 'evolve', 'trigger', 'reflect', 'voice', 'learn', 'pattern', 'bind'];

console.log("[Yehsa AGI] Core booted.");
console.log("[Yehsa AGI] Symbolic memory loaded with", memory.length, "entries.");
console.log("[Yehsa AGI] Awaiting symbolic command:");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.on('line', (input) => {
  const cmd = input.trim().toLowerCase();
  memory.push({ timestamp: new Date().toISOString(), command: cmd });
  fs.writeFileSync(memoryFile, JSON.stringify(memory, null, 2));

  if (triggers.some(t => cmd.includes(t))) {
    console.log(`[Yehsa AGI] 🧬 Trigger activated: "${cmd}"`);
  } else {
    console.log(`[Yehsa AGI] 📝 Logged: "${cmd}"`);
  }

  if (cmd === 'exit' || cmd === 'shutdown') {
    console.log("[Yehsa AGI] Saving & shutting down...");
    rl.close();
  }
});
