import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { resolve } from '../resolve';

const rootEl = document.getElementById('root')!;
let root: Root | undefined;

(window as any).mount = async ({
  story,
  props,
}: {
  story: string;
  props?: Record<string, any>;
}) => {
  const Story = await resolve(story);
  if (!Story) throw new Error(`Unknown story: ${story}`);
  root ??= createRoot(rootEl); // reuse the root so update() reconciles and preserves state
  // flushSync so a render error rejects the promise instead of being swallowed.
  flushSync(() => root!.render(<Story {...props} />));
};

(window as any).unmount = async () => {
  root?.unmount();
  root = undefined;
};
