import fs from "fs";
import readline from "readline";
import { getDefinitions } from './symbolic_dictionary.js';

const memory = JSON.parse(fs.readFileSync("./symbolic_memory/learning_queue.json", "utf-8"));
const learnedPath = "./symbolic_memory/trainer_learned.json";
const learned = fs.existsSync(learnedPath) ? JSON.parse(fs.readFileSync(learnedPath, "utf-8")) : {};
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function promptSymbol(index = 0) {
  if (index >= memory.length) {
    console.log("✅ All symbols classified.");
    rl.close();
    return;
  }

  const symbol = memory[index].symbol;
  const defs = getDefinitions(symbol);
  if (defs.length) console.log(`[📚 DICTIONARY] Definitions for "${symbol}":`, defs);

  rl.question(`[?] Symbol: "${symbol}" — Enter response: `, async (response) => {
    learned[symbol] = response;
    fs.writeFileSync(learnedPath, JSON.stringify(learned, null, 2));
    await promptSymbol(index + 1);
  });
}

promptSymbol();
