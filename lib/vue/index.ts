import { createApp, h, shallowRef, type App, type Component } from 'vue';
import { resolve } from '../resolve';

const story = shallowRef<Component | null>(null);
const props = shallowRef<Record<string, any>>({});
const host = {
  render: () => (story.value ? h(story.value, props.value) : null),
};
let app: App | undefined;

(window as any).mount = async ({
  story: id,
  props: next,
}: {
  story: string;
  props?: Record<string, any>;
}) => {
  const resolved = await resolve(id);
  if (!resolved) throw new Error(`Unknown story: ${id}`);
  story.value = resolved;
  props.value = next ?? {};
  if (!app) {
    // mount once; the ref updates above re-render in place
    app = createApp(host);
    app.mount('#root');
  }
};

(window as any).unmount = async () => {
  app?.unmount();
  app = undefined;
};
