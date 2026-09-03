import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parse, stringify } from 'yaml';
import { validateContent } from './content-validator.mjs';

const projectRoot = process.cwd();
const sourceContent = path.join(projectRoot, 'content');
const sampleSlug = 'interfaces-as-epistemic-partners';
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'fan-log-contracts-'));

function makeFixture(name) {
  const fixture = path.join(temporaryRoot, name);
  fs.mkdirSync(fixture, { recursive: true });
  copyTree(sourceContent, path.join(fixture, 'content'));
  return fixture;
}

function copyTree(source, destination) {
  fs.mkdirSync(destination, { recursive: true });
  for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
    const sourcePath = path.join(source, entry.name);
    const destinationPath = path.join(destination, entry.name);
    if (entry.isDirectory()) copyTree(sourcePath, destinationPath);
    else fs.copyFileSync(sourcePath, destinationPath);
  }
}

function updateMeta(fixture, update) {
  const metaPath = path.join(fixture, 'content', 'posts', sampleSlug, 'meta.yaml');
  const meta = parse(fs.readFileSync(metaPath, 'utf8'));
  update(meta);
  fs.writeFileSync(metaPath, stringify(meta));
}

const cases = [
  {
    name: 'missing-field',
    expected: 'summary requires en and zh',
    mutate: (fixture) => updateMeta(fixture, (meta) => { delete meta.summary.zh; }),
  },
  {
    name: 'invalid-date',
    expected: 'publishedAt must be a valid quoted YYYY-MM-DD date',
    mutate: (fixture) => updateMeta(fixture, (meta) => { meta.publishedAt = '2026-02-30'; }),
  },
  {
    name: 'orphaned-translation',
    expected: 'missing zh.mdx',
    mutate: (fixture) => fs.unlinkSync(path.join(fixture, 'content', 'posts', sampleSlug, 'zh.mdx')),
  },
  {
    name: 'unknown-tag',
    expected: 'unknown tag(s): imaginary-topic',
    mutate: (fixture) => updateMeta(fixture, (meta) => { meta.tags = ['imaginary-topic']; }),
  },
  {
    name: 'missing-citation',
    expected: 'missing BibTeX key does-not-exist',
    mutate: (fixture) => fs.appendFileSync(
      path.join(fixture, 'content', 'posts', sampleSlug, 'en.mdx'),
      '\n\nA broken reference [@does-not-exist].\n',
    ),
  },
  {
    name: 'public-draft',
    expected: 'drafts must stay outside content/posts',
    mutate: (fixture) => updateMeta(fixture, (meta) => { meta.draft = true; }),
  },
  {
    name: 'unbalanced-math',
    expected: 'unbalanced display-math delimiters',
    mutate: (fixture) => fs.appendFileSync(
      path.join(fixture, 'content', 'posts', sampleSlug, 'en.mdx'),
      '\n\n$$\n',
    ),
  },
];

try {
  const baseline = validateContent(makeFixture('baseline'));
  if (baseline.errors.length > 0) {
    throw new Error(`Baseline content did not validate:\n${baseline.errors.join('\n')}`);
  }

  for (const testCase of cases) {
    const fixture = makeFixture(testCase.name);
    testCase.mutate(fixture);
    const result = validateContent(fixture);
    const output = result.errors.join('\n');
    if (result.errors.length === 0 || !output.includes(testCase.expected)) {
      throw new Error(`${testCase.name} did not fail as expected:\n${output}`);
    }
  }

  console.log(`Verified ${cases.length} failing content-contract cases plus the valid baseline.`);
} finally {
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}
