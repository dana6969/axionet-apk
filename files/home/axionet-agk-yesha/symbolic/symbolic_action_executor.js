import { getDefinitions } from "./symbolic_dictionary.js";
import fs from "fs";
import { sendMeshAction } from "./mesh_dispatch.js";
import { biometricConfirm } from "./biometric_lock.js";

const actionMap = {
  "light": "activate_illumination",
  "unlock": "access_core_memory",
  "dreamgate": "open_cosmic_portal"
};

export function executeSymbol(symbol) {
  (async () => {
    const action = actionMap[symbol];
    if (!action) return console.log(`[🤔 No mapped action for] ${symbol}`);
    if (["unlock", "erase", "shutdown"].includes(symbol) && !(await biometricConfirm(symbol))) return;
    console.log(`[⚡ Executing] ${symbol} → ${action}()`);
    fs.appendFileSync("symbolic_memory/executed_log.json", JSON.stringify({ symbol, action, ts: Date.now() }) + ",\n");
    sendMeshAction(symbol, action);
  })();
}
