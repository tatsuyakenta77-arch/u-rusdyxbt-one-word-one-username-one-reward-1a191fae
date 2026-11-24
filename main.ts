// One Word, One Username, One Reward — make.fun entry.
//
// The entry is exactly one word: "tatsuya-kenta" — the entrant's own
// make.fun username, sent as a single word and nothing else. It is a
// real handle, worn with pride: two names joined by one hyphen, the
// name of a maker who builds tiny cardboard worlds and ships them
// every day. Short, memorable, unmistakably its owner's.
//
// The program writes that single word to /output/entry.txt (the
// directory comes from MAKEFUN_OUTPUT_DIR, default /output) and
// prints exactly the same word to stdout. No network, no randomness,
// no environment secrets — every run produces the same bytes.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const word = "tatsuya-kenta";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate allows 1–30 characters of UTF-8 text, not only whitespace,
// and the judge compares exactly one username: refuse to ship
// anything that is not a single word inside that limit.
if (!/^\S{1,30}$/.test(word)) {
  throw new Error(`entry word ${JSON.stringify(word)} is not a single word of 1-30 characters`);
}

const dst = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(dst, word, "utf8");

// Read it back and verify the file holds exactly the word, byte for
// byte, so a partial or corrupted write can never reach the judge.
if (readFileSync(dst, "utf8") !== word) {
  throw new Error("entry.txt does not hold exactly the entry word");
}
console.log(word);
