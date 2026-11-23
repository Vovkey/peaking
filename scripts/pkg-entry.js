const path = require('path');
const fs = require('fs');

const execDir = path.dirname(process.execPath);
const realNextDir = path.join(execDir, '.next');

const origChdir = process.chdir.bind(process);
process.chdir = (dir) => {
  if (typeof dir === 'string' && dir.startsWith('/snapshot')) {
    return;
  }
  return origChdir(dir);
};

if (execDir && !execDir.startsWith('/snapshot') && fs.existsSync(execDir)) {
  origChdir(execDir);
}

function remapSnapshotNext(p) {
  if (typeof p !== 'string' || !p.startsWith('/snapshot')) return p;
  const idx = p.indexOf('/.next');
  if (idx === -1) return p;
  const suffix = p.slice(idx + '/.next'.length);
  return path.join(realNextDir, suffix);
}

for (const fnName of ['existsSync', 'statSync', 'lstatSync', 'readFileSync', 'readdirSync']) {
  const orig = fs[fnName].bind(fs);
  fs[fnName] = (target, ...args) => {
    const mapped = remapSnapshotNext(target);
    return orig(mapped, ...args);
  };
}

process.env.HOSTNAME = process.env.HOSTNAME || '0.0.0.0';
process.env.PORT = process.env.PORT || '3000';

module.require(path.join(execDir, 'server.js'));
