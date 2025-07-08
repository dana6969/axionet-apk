// hotSwapEngine.js
import { applyPatch } from './utils/patcher';

export function hotSwap(moduleName, newCode) {
    try {
        applyPatch(moduleName, newCode);
        return "Hot swap complete.";
    } catch (e) {
        return "Swap failed: " + e.message;
    }
}