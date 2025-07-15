import { parseTextToSymbols } from "../yesha_modules/core/text_parser.mjs"; import { classifyIntent } from "../yehsa_modules/core/intent_classifier.js"; import { executeAction } from "../yehsa_modules/core/action_executor.js"; import { logSymbolInteraction } from "./symbolic/logger.js";

export function receiveMeshData(inputText) {
  const symbols = parseTextToSymbols(inputText);
  const intent = classifyIntent(symbols);
  const action = executeAction(intent);
  logSymbolInteraction(symbols, "phase4:mesh_receive:" + inputText);
  if (action && action.type === "relay") {
    console.log("[Mesh Relay Triggered]", action);
  } else {
    console.log("[Mesh Received]", inputText);
  }
}
import { logToLearningQueue } from './symbolic_memory/learning_queue_handler.js'; logToLearningQueue({ symbol: 'fear', context: 'phase4:input_text:fear of intelligence beyond light', timestamp: Date.now() });
