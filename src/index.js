import download, { _cache, baseOutDir } from './download.js';
import { join } from 'path';

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

const [ channel = 'canary' ] = process.argv.slice(2);

for (const mod of modules) {
  await download(channel, mod);
}

// hack to get manifest from download
const manifest = Object.values(_cache)[0];

const hostVersion = manifest.full.host_version.join('.');
fs.cpSync(join(baseOutDir, hostVersion), join(baseOutDir, 'latest'), { recursive: true });
