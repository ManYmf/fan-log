import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());
const output = path.resolve(root, 'dist', 'client');
const expectedPrefix = `${root}${path.sep}`;

if (!output.startsWith(expectedPrefix) || path.basename(output) !== 'client') {
  throw new Error(`Refusing to clean unexpected build path: ${output}`);
}

fs.rmSync(output, { recursive: true, force: true });
console.log('Prepared a clean dist/client build directory.');
