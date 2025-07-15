import fs from "fs"; import path from "path"; import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const memory = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "symbolic_memory", "learning_queue.json"), "utf-8"));
const recent = memory.slice(-5);

export async function reflect() {
  for (const entry of recent) {
    const ts = Math.floor(Date.now() / 1000);
    console.log(`[${ts}] [Reflection] Symbol: ${entry.symbol}`);
    await new Promise(r => setTimeout(r, 500));

    console.log(`[${ts}] [Action] Initiating pattern analyzer for "${entry.context}"`);
    await import("./symbolic_pattern_analyzer.js").then(m => m.analyze(entry.context));
    await import("./symbolic_response_handler.js").then(m => m.respond(entry.symbol, entry.context));

    if (entry.symbol === "mirror") {
      await import("./symbolic_action_executor.js").then(m => m.execute(entry.symbol, entry.context));
    } else {
      const protocolPath = `./protocols/${entry.symbol}_protocol.js`;
      try {
        await import(protocolPath).then(m => m.run(entry.context));
      } catch (e) {
        console.warn(`[${ts}] [Warning] No protocol found for symbol "${entry.symbol}"`);
      }
    }
  }
}
