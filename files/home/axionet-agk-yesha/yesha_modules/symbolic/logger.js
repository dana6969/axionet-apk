import coreReasoner from "./core_reasoner.js";
import { dispatchAction } from "../core/action_dispatcher.js";
import { appendMemory } from "./memory_utilities.js";
import { expandQuery } from "./query_expander.js";
import fs from "fs";

const chainPath = "logs/symbol_chain.log";

export function logSymbolInteraction(symbols, context) {
  const result = coreReasoner(symbols, { context });
  const expansion = expandQuery(symbols, context);
  dispatchAction(result);
  appendMemory({ timestamp: new Date().toISOString(), symbols, reasoning: result, context, expansion });
  const timestamp = new Date().toISOString();
  const logLine = `[${timestamp}] Yehsa AGI Log | Symbols: ${symbols.join(", ")} | Context: ${context} | Reasoning: ${JSON.stringify(result)} | Expansion: ${expansion.prompt}`;
  console.log(logLine);
  const entry = { timestamp, symbols, reasoning: result, context, expansion };
  const data = fs.existsSync(chainPath) ? JSON.parse(fs.readFileSync(chainPath, "utf-8")) : [];
  data.push(entry);
  fs.writeFileSync(chainPath, JSON.stringify(data, null, 2));
}
