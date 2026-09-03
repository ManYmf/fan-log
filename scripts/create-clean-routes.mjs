import fs from 'node:fs';
import path from 'node:path';

const output = path.join(process.cwd(), 'dist', 'client');

function collectHtmlFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? collectHtmlFiles(fullPath)
      : entry.name.endsWith('.html')
        ? [fullPath]
        : [];
  });
}

const pages = collectHtmlFiles(output).filter((file) => {
  const relative = path.relative(output, file).replaceAll('\\', '/');
  return path.basename(file) !== 'index.html' && relative !== '404.html';
});

let moved = 0;
let removedDuplicates = 0;

for (const source of pages) {
  const routeDirectory = path.join(
    path.dirname(source),
    path.basename(source, '.html'),
  );
  const cleanRoute = path.join(routeDirectory, 'index.html');

  if (fs.existsSync(cleanRoute)) {
    fs.unlinkSync(source);
    removedDuplicates += 1;
    continue;
  }

  fs.mkdirSync(routeDirectory, { recursive: true });
  fs.renameSync(source, cleanRoute);
  moved += 1;
}

const nestedIndexes = collectHtmlFiles(output).filter((file) =>
  path.relative(output, file).replaceAll('\\', '/').endsWith('/index/index.html'),
);

for (const file of nestedIndexes) {
  fs.unlinkSync(file);
  const parent = path.dirname(file);
  if (fs.readdirSync(parent).length === 0) fs.rmdirSync(parent);
}

console.log(
  `Prepared clean routes: ${moved} moved, ${removedDuplicates + nestedIndexes.length} duplicate files removed.`,
);
