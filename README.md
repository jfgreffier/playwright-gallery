# Playwright gallery

Playwright story gallery for component testing

playwright-gallery's goal is to provide a lightweight story gallery for the most popular frameworks.

| Framework | Available |
| --------- | --------- |
| React     | ❌        |
| Vue.js    | ❌        |
| Angular   | ❌        |
| Svelte    | ❌        |
| Solid.js  | ❌        |

## Getting started

1. Create an HTML file

playwright/gallery/index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Playwright Component Gallery</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.tsx"></script>
  </body>
</html>

```

2. Create a .tsc file and import playwright-gallery

playwright/gallery/main.tsx
```ts
import 'playwright-gallery/react';

// Import styles, initialize component theme here.
// import '../src/common.css';

```

3. Once the gallery is setup you may [configure Playwright](https://playwright.dev/docs/test-components#step-2-configure-playwright) as usual, then write a [story](https://playwright.dev/docs/test-components#step-3-write-a-story) and [test](https://playwright.dev/docs/test-components#step-3-write-a-story)

## Contributing

Note that the project is in early stage.

- Small, incremental changes are easier to review.
- AI contributions are not encouraged.
