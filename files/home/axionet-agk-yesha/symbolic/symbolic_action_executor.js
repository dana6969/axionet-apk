export async function executeSymbol(input) {
  const raw = input || {};
  const symbol = typeof raw.symbol === "string" ? raw.symbol : raw.symbol?.symbol || "unknown";
  const context = typeof raw.context === "string" ? raw.context : raw.symbol?.context || "none";
  const actionMap = {
    light: "activate_illumination",
    fear: "defend_core",
    mirror: "reflect_reality",
    unlock: "open_memory"
  };
  const action = actionMap[symbol] || "echo_symbol_response";
  const timestamp = Date.now();
  const symbolStr = typeof symbol === "object" ? symbol.symbol || JSON.stringify(symbol) : symbol;
  const contextStr = typeof context === "object" ? context.context || JSON.stringify(context) : context;
  console.log(`[🤖 Auto-mapping] No predefined action for ${symbolStr}. Using fallback.`);
  console.log(`[⚡ Executing] ${symbolStr} → ${action}()`);
  console.log(`[📡 DISPATCH] ${symbolStr} → ${action}`);
  console.log(`[🔁 RELAY] Rebroadcasting: { symbol: ${symbolStr}, context: ${contextStr}, action: ${action}, timestamp: ${timestamp} }`);
  globalThis.meshBroadcast?.({
    symbol: { symbol: symbolStr, context: contextStr },
    action,
    timestamp,
  });
  if (action === "echo_symbol_response") {
    console.log(`[✅] Echo: ${symbolStr} acknowledged.`);
  }
}
