import { trainSymbol } from './trainers/symbolic_trainer.js';
import { trainMemory } from './trainers/memory_trainer.js';
import { trainPattern } from './trainers/pattern_trainer.js';
import { trainAGI } from './trainers/AGITrainer.js';
import fs from 'fs';

export function runAutonomyLoop(input) {
  const sym = trainSymbol(input.symbol);
  const mem = trainMemory(input.symbol);
  const pat = trainPattern(input.symbol);
  const agi = trainAGI(input.symbol);

  const result = { timestamp: new Date().toISOString(), input, output: { sym, mem, pat, agi } };
  fs.appendFileSync('./yesha_modules/logs/symbolic_output.log', JSON.stringify(result, null, 2) + '\n');
  return result;
}
