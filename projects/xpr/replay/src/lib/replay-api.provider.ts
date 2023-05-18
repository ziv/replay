import type { FactoryProvider } from '@angular/core';
import { ApplicationRef } from '@angular/core';
import { ReplayInterceptor, ReplayMode } from './replay.interceptor';
import { clearCache, clearStorage, load, save } from './storage-api';
import replayUi from './replay-ui';

export type ReplayAction = () => string;

export interface ReplayApi {
  stop: ReplayAction;
  record: ReplayAction;
  replay: ReplayAction;
  save: ReplayAction;
  load: ReplayAction;
  clearCache: ReplayAction;
  clearStorage: ReplayAction;
  clear: ReplayAction;
  ui: ReplayAction;
  help: ReplayAction;
  status: () => ReplayMode;
}

const provider: FactoryProvider = {
  provide: 'ReplayApi',
  deps: [ReplayInterceptor, ApplicationRef],
  useFactory: (replay: ReplayInterceptor, app: ApplicationRef): ReplayApi => {
    const api: ReplayApi = {
      status: () => replay.mode,
      stop: () => {
        replay.stop();
        return 'ng-replay: stopped';
      },
      record: () => {
        replay.record();
        return 'ng-replay: recording';
      },
      replay: () => {
        replay.replay();
        return 'ng-replay: replay';
      },
      save: () => {
        save();
        return 'ng-replay: saved';
      },
      load: () => {
        load();
        return 'ng-replay: loaded';
      },
      clearCache: () => {
        clearCache();
        return 'ng-replay: cache cleared';
      },
      clearStorage: () => {
        clearStorage();
        return 'ng-replay: storage cleared';
      },
      clear: () => {
        clearStorage();
        clearCache();
        return 'ng-replay: cleared';
      },
      ui: () => {
        replayUi(api);
        return 'ng-replay-ui: loaded';
      },
      // ui: () => {
      //   // search for UI
      //   const uiElement = document.querySelector('.ng-replay-ui');
      //   if (uiElement) {
      //     // already loaded, nothing to do
      //     return 'ng-replay-ui: already loaded';
      //   }
      //
      //   // register UI
      //   // creating the container
      //   const el = document.createElement('div');
      //   el.style.position = 'absolute';
      //   el.style.top = '0px';
      //   el.style.right = '0px'
      //   // append container to body
      //   document.body.appendChild(el);
      //   // create the component
      //   const cr = createComponent(ReplayUiComponent, {
      //     hostElement: el,
      //     environmentInjector: app.injector,
      //   });
      //   console.log(cr.hostView);
      //   app.attachView(cr.hostView);
      //   return 'ng-replay-ui: loaded';
      // },
      help: () => 'help text TBC'
    };
    return api;
  }
}

export default provider;
