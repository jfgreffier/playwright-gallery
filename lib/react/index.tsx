import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';

const stories = import.meta.glob([
  '/**/*.story.{tsx,jsx}',
  '!/node_modules/**',
  '!/dist/**',
  '!/playwright-report/**',
  '!/test-results/**',
]);

const id = (f: string) => f.replace(/^(\.\.\/)+src\//, '').replace(/\.story\.\w+$/, '');

async function resolve(storyId: string) {
  const sep = storyId.lastIndexOf('/');
  const [path, name] = [storyId.slice(0, sep), storyId.slice(sep + 1)];
  const file = Object.keys(stories).find(f => id(f) === path || id(f).endsWith('/' + path));
  const mod = (file && await stories[file]()) as Record<string, any> | undefined;
  return mod?.[name] ?? mod?.default;
}

const rootEl = document.getElementById('root')!;
let root: Root | undefined;

(window as any).mount = async ({ story, props }: { story: string, props?: Record<string, any> }) => {
  const Story = await resolve(story);
  if (!Story)
    throw new Error(`Unknown story: ${story}`);
  root ??= createRoot(rootEl);   // reuse the root so update() reconciles and preserves state
  // flushSync so a render error rejects the promise instead of being swallowed.
  flushSync(() => root!.render(<Story {...props} />));
};

(window as any).unmount = async () => {
  root?.unmount();
  root = undefined;
};
