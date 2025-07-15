export function logSymbolInteraction(symbols, context) {
  const log = { timestamp: Date.now(), context, symbols };
  console.log("[Symbol Log]", JSON.stringify(log, null, 2));
}
