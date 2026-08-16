# Playwright gallery

[![NPM Version](https://img.shields.io/npm/v/playwright-gallery)](https://www.npmjs.com/package/playwright-gallery)

Playwright story gallery for component testing

playwright-gallery's goal is to provide a lightweight story gallery for the most popular frameworks, easily enabling component testing with Playwright.

| Framework | Available |
| --------- | --------- |
| React     | ✅        |
| Vue.js    | ✅        |
| Angular   | ✅        |
| Svelte    | ❌        |
| Solid.js  | ❌        |

## Getting started

```bash
npm install --save-dev playwright-gallery
npx playwright-gallery init
```

Once the gallery is setup you may write a [story](https://playwright.dev/docs/test-components#step-3-write-a-story) and [test](https://playwright.dev/docs/test-components#step-4-write-a-test)

## Manual setup

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
    <script type="module" src="./main.ts"></script>
  </body>
</html>

```

2. Install `playwright-gallery`

 ```bash
npm install --save-dev playwright-gallery
```

3. Create a .ts file and import playwright-gallery with the needed frontend framework

playwright/gallery/main.ts
```ts
import 'playwright-gallery/react';

// Import styles, initialize component theme here.
// import '../src/common.css';

```

4. Once the gallery is setup you may [configure Playwright](https://playwright.dev/docs/test-components#step-2-configure-playwright) as usual, then write a [story](https://playwright.dev/docs/test-components#step-3-write-a-story) and [test](https://playwright.dev/docs/test-components#step-4-write-a-test)

## Examples

### React

src/components/CounterButton.tsx
```ts
import { useState } from "react";

export const CounterButton = ({ initalCount = 0 }: { initalCount?: number }) => {
  const [count, setCount] = useState(initalCount);
  return (
    <button
      type="button"
      className="counter"
      onClick={() => setCount((count) => count + 1)}
    >
      Count is {count}
    </button>
  );
};

```

src/components/CounterButton.story.tsx
```ts
import { CounterButton } from "./CounterButton";

export const Primary = () => <CounterButton />;

export const Seven = () => <CounterButton initalCount={7} />;

```

tests/components/counterbutton.spec.ts
```ts
import { test, expect } from "@playwright/test";

test("renders primary button", async ({ mount }) => {
  const component = await mount("components/CounterButton/Primary");

  await expect(component.getByRole("button")).toContainText("Count is");
});

test("button shows inital count", async ({ mount }) => {
  const component = await mount("components/CounterButton/Seven");

  await expect(component.getByRole("button")).toHaveText("Count is 7");
});

```

### Vue.js

src/components/Count.vue
```ts
<script setup lang="ts">
import { ref } from "vue";

const props = withDefaults(defineProps<{ initialCount?: number }>(), {
  initialCount: 0,
});

const count = ref(props.initialCount);
</script>

<template>
  <button type="button" class="counter" @click="count++">
    Count is {{ count }}
  </button>
</template>

```

src/components/Count.story.ts
```ts
import { defineComponent, h } from "vue";
import Count from "./Count.vue";

export const Primary = defineComponent(() => () => h(Count));

export const Seven = defineComponent(() => () => h(Count, { initialCount: 7 }));

```

tests/components/count.spec.ts
```ts
import { test, expect } from "@playwright/test";

test("renders primary button", async ({ mount }) => {
  const component = await mount("components/Count/Primary");

  await expect(component.getByRole("button")).toContainText("Count is");
});

test("button shows inital count", async ({ mount }) => {
  const component = await mount("components/Count/Seven");

  await expect(component.getByRole("button")).toHaveText("Count is 7");
});

```

### Angular

src/components/counter-button.component.ts
```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counterbutton',
  standalone: true,
  template: `<button type="button" (click)="increment()">Count is {{ count }}</button>`,
})
export class CounterButtonComponent {
  @Input() count = 0;

  increment(): void {
    this.count += 1;
  }
}

```

src/components/counter-button.story.ts
```ts
import { Component, Input } from '@angular/core';

import { CounterButtonComponent } from './counter-button.component';

@Component({
  selector: 'app-counterbutton-primary-story',
  standalone: true,
  imports: [CounterButtonComponent],
  template: `<app-counterbutton [count]="count"></app-counterbutton>`,
})
export class Primary {
  @Input() count = 0;
}

@Component({
  selector: 'app-counterbutton-seven-story',
  standalone: true,
  imports: [CounterButtonComponent],
  template: `<app-counterbutton [count]="count"></app-counterbutton>`,
})
export class Seven {
  @Input() count = 7;
}

```

tests/components/counter-button.spec.ts
```ts
import { test, expect } from '@playwright/test';

test('renders primary button', async ({ mount }) => {
  const component = await mount('components/counter-button/Primary');

  await expect(component.getByRole('button')).toContainText('Count is');
});

test('button shows inital count', async ({ mount }) => {
  const component = await mount('components/counter-button/Seven');

  await expect(component.getByRole('button')).toHaveText('Count is 7');
});

```

## Contributing

Note that the project is in early stage.

- Small, incremental changes are easier to review.
- AI contributions are not encouraged.
