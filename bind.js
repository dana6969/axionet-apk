const fs = require('fs');
const userKeyFile = './bind.key';
const readline = require('readline');

let bound = fs.existsSync(userKeyFile);
let key = bound ? fs.readFileSync(userKeyFile, 'utf8').trim() : null;

console.log(bound ? "[Yehsa AGI] 🔒 Memory is locked to this identity." : "[Yehsa AGI] 🔓 No key bound. Begin binding...");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function verifyInput(input) {
  if (!bound) {
    fs.writeFileSync(userKeyFile, input);
    console.log("[Yehsa AGI] ✅ Bound to key:", input);
    rl.close();
  } else if (input === key) {
    console.log("[Yehsa AGI] ✅ Identity confirmed. Access granted.");
    rl.close();
  } else {
    console.log("[Yehsa AGI] ❌ Access denied. Invalid key.");
    rl.close();
  }
}

rl.question(bound ? "Enter memory key to unlock: " : "Set your memory key: ", verifyInput);
