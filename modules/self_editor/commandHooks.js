// commandHooks.js
import { processCodeInjection } from './selfEdit';
import { hotSwap } from './hotSwapEngine';

export function handleCommand(cmd) {
    if (cmd.startsWith("/add ")) return processCodeInjection(cmd);
    if (cmd.startsWith("/swap ")) {
        const [_, name, ...rest] = cmd.split(" ");
        return hotSwap(name, rest.join(" "));
    }
    return "Command not recognized.";
}