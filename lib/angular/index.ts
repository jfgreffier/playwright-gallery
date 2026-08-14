import '@angular/compiler';
import {
  createComponent,
  type ApplicationRef,
  type ComponentRef,
  type Type,
} from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { resolve } from '../resolve';

const rootEl = document.getElementById('root')!;
let app: ApplicationRef | undefined;
let component: ComponentRef<any> | undefined;
let mountedStory: Type<unknown> | undefined;

(window as any).mount = async ({
  story,
  props,
}: {
  story: string;
  props?: Record<string, any>;
}) => {
  const resolved = await resolve(story);
  if (!resolved) throw new Error(`Unknown story: ${story}`);
  if (!app) {
    app = await createApplication();
  }
  if (mountedStory !== resolved) {
    if (component) {
      app.detachView(component.hostView);
      component.destroy();
    }
    component = createComponent(resolved, {
      environmentInjector: app.injector,
      hostElement: rootEl,
    });
    app.attachView(component.hostView);
    mountedStory = resolved;
  }
  if (props) {
    Object.assign(component.instance, props);
  }
  component.changeDetectorRef.detectChanges();
};

(window as any).unmount = async () => {
  app?.destroy();
  app = undefined;
  component = undefined;
  mountedStory = undefined;
};
