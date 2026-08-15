#!/usr/bin/env node
import { mkdir, writeFile } from 'node:fs/promises';

const files = [
  {
    path: './playwright/gallery/index.html',
    content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Playwright Component Gallery</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.ts"></script>
  </body>
</html>
`,
  },
  {
    path: './playwright/gallery/main.ts',
    content: `import 'playwright-gallery/react';

// Import styles, initialize component theme here.
// import '../src/common.css';
`,
  },
  {
    path: './playwright-ct.config.ts',
    content: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'components',
      testDir: './tests/components',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5173/playwright/gallery/index.html',
        serviceWorkers: 'block',
        reuseContext: true,
      },
    },
  ],
  webServer: {
    command: 'vite',
    url: 'http://localhost:5173/playwright/gallery/index.html',
    reuseExistingServer: !process.env.CI,
  },
});
`,
  },
];

async function init() {
  const args = process.argv.slice(2);
  if (args.length !== 1 || args[0] !== 'init') {
    console.log('Usage: npx playwright-gallery init');
    process.exitCode = 1;
    return;
  }

  await mkdir('./playwright/gallery', { recursive: true });
  for (const file of files) {
    writeFile(file.path, file.content);
    console.log(`Created ${file.path}`);
  }
  console.log(
    'You can run your tests with npx playwright test --config=playwright-ct.config.ts',
  );
}

init();
