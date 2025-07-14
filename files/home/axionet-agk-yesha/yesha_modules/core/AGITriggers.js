import { memoryTrigger } from "../memory/events/memory_trigger.js";
import { startAutonomyLoop } from "./autonomy_loop.js";

memoryTrigger();
startAutonomyLoop();
import coreReasoner from "../symbolic/core_reasoner.js"; import { updateState, getState } from "../symbolic/state_tracker.js"; import { logSymbolInteraction } from "../symbolic/logger.js"; export function AGITrigger(symbols, context = "live") { updateState("context", context); logSymbolInteraction(symbols, getState("context")); return coreReasoner(symbols, { context: getState("context") }); }
