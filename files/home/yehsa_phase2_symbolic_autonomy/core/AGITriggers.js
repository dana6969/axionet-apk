const fs = require("fs");
const path = require("path");
const memory = require("./memory_utilities");

global.log = (msg) => {
  if (!fs.existsSync("logs")) fs.mkdirSync("logs");
  fs.appendFileSync("logs/symbolic_output.log", msg + "\n");
  console.log(msg);
};

const triggers = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../intents/symbolic_triggers.json"), "utf-8")
);

global.log("🧠 Yehsa AGI: Trigger Loop Start");

for (const trigger of triggers) {
  const result = memory.processSymbolicInput(trigger);
  global.log(`${trigger.intent} ➜ Memory Result: ${result}`);
}
