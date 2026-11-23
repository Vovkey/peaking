const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');

async function build() {
  console.log('1. Building Next.js Standalone...');
  execSync('npx next build', { stdio: 'inherit' });

  console.log('2. Copying Standalone Files & Native Dependencies to dist/...');
  fs.emptyDirSync('dist');

  if (fs.existsSync('.next/standalone/server.js')) {
    fs.copySync('.next/standalone/server.js', 'dist/server.js');
  }
  if (fs.existsSync('.next/standalone/.next')) {
    fs.copySync('.next/standalone/.next', 'dist/.next');
  }
  if (fs.existsSync('.next/BUILD_ID')) {
    fs.copySync('.next/BUILD_ID', 'dist/.next/BUILD_ID');
  }
  if (fs.existsSync('.next/static')) {
    fs.copySync('.next/static', '.next/standalone/.next/static');
    fs.copySync('.next/static', 'dist/.next/static');
  }
  if (fs.existsSync('public')) {
    fs.copySync('public', '.next/standalone/public');
    fs.copySync('public', 'dist/public');
  }
  if (fs.existsSync('prisma')) {
    fs.copySync('prisma', '.next/standalone/prisma');
    fs.copySync('prisma', 'dist/prisma');
  }

  const sharpSrc = '.next/standalone/node_modules/sharp';
  if (fs.existsSync(sharpSrc)) {
    fs.copySync(sharpSrc, 'dist/sharp');
  }

  console.log('3. Packaging into Linux Executable...');
  execSync(
    'npx --yes @yao-pkg/pkg scripts/pkg-entry.js --target node22-linux-x64 --output dist/peaking-linux',
    { stdio: 'inherit' }
  );

  const ready =
    fs.existsSync('dist/server.js') && fs.existsSync(path.join('dist/.next', 'BUILD_ID'));
  console.log(` Built dist/peaking-linux (server.js & BUILD_ID ready: ${ready})`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
