// gta6-meme-x-01 entry (Node 22, standard library only).
//
// The program is deterministic: the same POST.json bytes go out on every
// run, and it touches nothing outside the repository and the output dir.
// The program copies POST.json — the address of the GTA 6 meme post on X —
// from the repository root to the output directory. That is all it does.
// The post itself is the entry: the house reads the post from X (its first
// picture, meme.png, and its text) and hands it to the AI judge.
//
// Outside the grader, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand in for
// /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
