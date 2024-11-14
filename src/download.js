import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { get } from 'https';
import zlib from 'zlib';
import cp from 'child_process';
import fs from 'fs';
import asar from '@electron/asar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const baseOutDir = join(__dirname, '..', 'out');

export const _cache = {};
const fetchJson = async url => {
  if (_cache[url]) return _cache[url];
  return _cache[url] = await (await fetch(url)).json();
};

const extractAsars = dir => {
  if (!fs.existsSync(dir)) return;

  for (const f of fs.readdirSync(dir)) {
    const p = join(dir, f);
    if (f.endsWith('.asar')) {
      console.log('extracting', f);

      asar.extractAll(p, p.replace('.asar', ''));
    }
  }
};


export default async (channel, mod, version) => {
  const manifest = await fetchJson(`https://discord.com/api/updates/distributions/app/manifests/latest?platform=win&channel=${channel}&arch=x64`);

  const hostVersion = manifest.full.host_version.join('.');
  version = version ?? (mod === 'host' ? manifest.full.host_version[2] : manifest.modules['discord_' + mod]?.full?.module_version);
  if (!version) return;

  const domain = `https://dl${channel === 'stable' ? '' : `-${channel}`}.discordapp.net`;

  // const downloadUrl = (mod === 'host' ? manifest : manifest.modules['discord_' + mod]).full.url;
  const downloadUrl = mod === 'host' ? `${domain}/distro/app/${channel}/win/x64/1.0.${version}/full.distro` : `${domain}/distro/app/${channel}/win/x64/${hostVersion}/discord_${mod}/${version}/full.distro`;
  console.log('DOWNLOADING', mod, version, '|', downloadUrl);

  const outDir = join(baseOutDir, hostVersion, mod === 'host' ? 'host' : `modules`, mod === 'host' ? '' : mod);

  const tarPath = join(__dirname, '..', 'tmp', mod + '-' + version + '.tar');
  let finalPath = join(outDir, mod === 'host' ? '' : `${version}`);
  if (global.LATEST_ONLY) finalPath = join(baseOutDir, mod === 'host' ? 'host' : `modules`, mod === 'host' ? '' : mod);

  fs.rmSync(tarPath, { force: true });
  fs.rmSync(finalPath, { recursive: true, force: true });

  await fs.promises.mkdir(dirname(tarPath)).catch(_ => {});

  const stream = zlib.createBrotliDecompress();
  stream.pipe(fs.createWriteStream(tarPath));

  let downloadTotal = 0, downloadCurrent = 0;
  get(downloadUrl, res => { // query for caching
    res.pipe(stream);

    downloadTotal = parseInt(res.headers['content-length'] ?? 1, 10);

    res.on('data', c => {
      downloadCurrent += c.length;

      // console.log((downloadCurrent / downloadTotal) * 100);
    });
  });

  await new Promise(res => stream.on('end', res));

  await fs.promises.mkdir(finalPath, { recursive: true }).catch(_ => {});

  const proc = cp.execFile('tar', [ '--strip-components', '1', '-xf', tarPath, '-C', finalPath]);
  await new Promise(res => proc.on('close', res));

  console.log('DOWNLOADED', finalPath);

  for (const p of [
    finalPath,
    join(finalPath, 'resources')
  ]) extractAsars(p);

  if (mod !== 'host' && !global.LATEST_ONLY) {
    fs.cpSync(finalPath, join(outDir, 'latest'), { recursive: true });
  }
};
