import { getDefinitions } from "./symbolic_dictionary.js";
import { sendMeshAction } from "./mesh_dispatch.js";
import fs from "fs";

export function executeSymbol(symbol) {
  const defs = getDefinitions(symbol);
  const lowerSymbol = symbol.toLowerCase();
  const lowerDefs = defs.map(d => d.toLowerCase());

  let action = null;
  if (lowerSymbol.includes("light") || lowerDefs.some(d => d.includes("illumination"))) action = "activate_illumination";
  else if (lowerSymbol.includes("unlock") || lowerDefs.some(d => d.includes("unlock") || d.includes("open"))) action = "open_seal";
  else if (lowerSymbol.includes("dreamgate")) action = "open_cosmic_portal";

  if (action) {
    console.log(`[⚡ Executing] ${symbol} → ${action}()`);
    fs.appendFileSync("symbolic_memory/executed_log.json", `{"symbol":"${symbol}","action":"${action}"}\n`);
sendMeshAction(symbol, action);

  } else {
    console.log(`[🤔 No mapped action for] ${symbol}`);
  }
}