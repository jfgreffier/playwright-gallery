const stories = import.meta.glob([
  '/**/*.story.{tsx,jsx,ts,js,vue}',
  '!/node_modules/**',
  '!/dist/**',
  '!/playwright-report/**',
  '!/test-results/**',
]);

const id = (f: string) =>
  f.replace(/^(\.\.\/)+src\//, '').replace(/\.story\.\w+$/, '');

export async function resolve(storyId: string) {
  const sep = storyId.lastIndexOf('/');
  const [path, name] = [storyId.slice(0, sep), storyId.slice(sep + 1)];
  const file = Object.keys(stories).find(
    (f) => id(f) === path || id(f).endsWith('/' + path)
  );
  const mod = (file && (await stories[file]())) as
    Record<string, any> | undefined;
  return mod?.[name] ?? mod?.default;
}
