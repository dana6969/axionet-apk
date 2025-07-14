import { trainSymbol } from './trainers/symbolic_trainer.js';
import { trainMemory } from './trainers/memory_trainer.js';
import { trainPattern } from './trainers/pattern_trainer.js';
import { trainAGI } from './trainers/AGITrainer.js';
import { trainReasoning } from './trainers/reasoning_trainer.js';

export function runAutonomyLoop(input) {
  const sym = trainSymbol(input);
  const mem = trainMemory(input);
  const pat = trainPattern(input);
  const agi = trainAGI(input);
  const reasoning = trainReasoning(input);
  return { loop: true, out: [sym, mem, pat, agi, reasoning] };
}
