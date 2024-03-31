import packageFile from '../package.json' with { type: 'json' };

export async function getVersion() {
  return packageFile.version;
}
