import download from './download.js';

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