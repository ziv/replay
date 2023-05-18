import type { FactoryProvider } from '@angular/core';
import ReplayService, { ReplayMode } from './replay.service';
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

function createApi(replay: ReplayService): ReplayApi {
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
      replay.save();
      return 'ng-replay: saved';
    },
    load: () => {
      replay.load();
      return 'ng-replay: loaded';
    },
    clearCache: () => {
      replay.clearCache();
      return 'ng-replay: cache cleared';
    },
    clearStorage: () => {
      replay.clearStorage();
      return 'ng-replay: storage cleared';
    },
    clear: () => {
      replay.clearStorage();
      replay.clearCache();
      return 'ng-replay: cleared';
    },
    ui: () => {
      replayUi(api);
      return 'ng-replay-ui: loaded';
    },
    help: () => 'help text TBC'
  };
  return api;
}

const provider: FactoryProvider = {
  provide: 'ReplayApi',
  deps: [ReplayService],
  useFactory: createApi
}

export default provider;
