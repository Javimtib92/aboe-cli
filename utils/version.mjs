import path from 'node:path';
import { readFileSync } from 'node:fs';

export function getVersion() {
  const packageFile = path.join(import.meta.dirname, '..', 'package.json');

  const data = readFileSync(packageFile, 'utf-8');

  const versionRegex = /"version": "([^"]*)"/;

  const match = versionRegex.exec(data);

  if (match[1]) {
    return match[1];
  }

  return null;
}
