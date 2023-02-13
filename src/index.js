import download, { _cache, baseOutDir } from './download.js';
import { join } from 'path';
import { cpSync, writeFileSync, readFileSync, existsSync } from 'fs';

global.LATEST_ONLY = true;

const modules = [
  'host',
  'desktop_core',
  'krisp',
  'dispatch',
  'utils',
  'media',
  'sekrit',
  'spellcheck',
  'hook',
  'modules',
  'overlay2',
  'game_utils',
  'voice',
  'vigilante',
  'rpc',
  'erlpack',
  'cloudsync',
];

let [ channel = 'canary', oldManifest = '' ] = process.argv.slice(2);
if (oldManifest && existsSync(oldManifest)) oldManifest = JSON.parse(readFileSync(oldManifest));

for (const mod of modules) {
  await download(channel, mod);
}

const manifestToVersions = manifest => ({
  host: manifest.full.host_version.join('.'),
  ...Object.keys(manifest.modules).reduce((acc, x) => {
    acc[x.replace('discord_', '')] = manifest.modules[x].full.module_version;
    return acc;
  }, {})
});

// hack to get manifest from download
const manifest = Object.values(_cache)[0];
const versions = manifestToVersions(manifest);
writeFileSync(join(baseOutDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

if (oldManifest) {
  const oldVersions = manifestToVersions(oldManifest);

  const updated = [];
  for (const x in oldVersions) {
    if (oldVersions[x] !== versions[x]) updated.push([ x, oldVersions[x], versions[x] ]);
  }

  writeFileSync('changes.txt', updated.map(([ name, o, n ]) => `${name}: ${o} -> ${n}`).join('\n'));
}

writeFileSync(join(baseOutDir, 'README.md'), `# discord-desktop-datamining

## ${channel} versions

**host: ${versions.host}**

| module | version |
| ------ | :-----: |
${Object.keys(versions).filter(x => x !== 'host').map(x => `| ${x} | ${versions[x]} |`).join('\n')}

## branches

- [stable](https://github.com/OpenAsar/discord-desktop-datamining/tree/stable)
- [ptb](https://github.com/OpenAsar/discord-desktop-datamining/tree/ptb)
- [canary](https://github.com/OpenAsar/discord-desktop-datamining/tree/canary)
- [development](https://github.com/OpenAsar/discord-desktop-datamining/tree/development)`)

const hostVersion = manifest.full.host_version.join('.');
if (!LATEST_ONLY) cpSync(join(baseOutDir, hostVersion), join(baseOutDir, 'latest'), { recursive: true });
