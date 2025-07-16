import { getDefinitions } from "./symbolic_dictionary.js";

export function reflect(recent) {
  for (const entry of recent) {
    const fusion = entry.symbol.split(/[-_ ]/).map(s => s.toLowerCase()).join("");
    console.log(`[🧬 Fusion Candidate] ${entry.symbol} → ${fusion}`);
  }
}