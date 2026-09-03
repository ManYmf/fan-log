import { validateContent } from './content-validator.mjs';

const result = validateContent(process.cwd());

if (result.errors.length > 0) {
  console.error(`Content validation failed with ${result.errors.length} issue(s):`);
  for (const error of result.errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${result.postCount} bilingual posts and ${result.bibCount} bibliography entries.`);
