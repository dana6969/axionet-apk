import fs from "fs";

export function sendMeshAction(symbol, action) {
  const payload = { symbol, action, timestamp: Date.now() };
  const log = `[📡 DISPATCH] Symbol: ${symbol} → ${action} → mesh node\n`;
  console.log(log);
  fs.appendFileSync("./symbolic_memory/mesh_log.json", JSON.stringify(payload) + "\n");
  // Future: send via BLE or serial here
}