/// <reference types="@types/chrome" />
import Request = chrome.devtools.network.Request;
import {BehaviorSubject, Observable} from "rxjs";

export enum DevtoolsMode {
  Off = 'off',
  Recording = 'recording',
  Replaying = 'replaying'
}

export enum DevtoolsActions {
  StartRecord,
  StopRecord,
  StartReplay,
  StopReplay
}



// named types
export type BODY = string;
export type METHOD = string;
export type URI = string;
export type ORIGIN = string;

export type Item = { headers: Headers; body: BODY; };
export type Path = Record<METHOD, Item>;
export type Payload = Record<URI, Path>;
export type Cache = Record<ORIGIN, Payload>;


export interface DevToolsState {
  mode: DevtoolsMode;
  size: number;
  origin?: ORIGIN;
}

export interface DevtoolsApi {
  changes: Observable<DevToolsState>;

  startRecord(): void;

  stopRecord(): void;

  startReplay(): void;

  stopReplay(): void;
}


export class DevtoolsCli implements DevtoolsApi {
  readonly #cache = new Set<string>();

  readonly #change$ = new BehaviorSubject<DevToolsState>({
    mode: DevtoolsMode.Off,
    size: 0
  });

  private readonly onRequestFinished: (req: Request) => void;

  get changes() {
    return this.#change$.asObservable();
  }

  constructor(origin: ORIGIN) {
    this.onRequestFinished = this.recorder.bind(this);
    this.update('origin', origin);
    // @ts-ignore
    // window['zi'] = {
    //   startRecord: this.startRecord.bind(this),
    //   stopRecord: this.stopRecord.bind(this),
    // };
  }

  startRecord() {
    chrome.devtools.network.onRequestFinished.addListener(this.onRequestFinished);
    this.update('mode', DevtoolsMode.Recording);
  }

  stopRecord() {
    chrome.devtools.network.onRequestFinished.removeListener(this.onRequestFinished);
    this.update('mode', DevtoolsMode.Off);
  }

  startReplay() {
    // todo notify background
    this.update('mode', DevtoolsMode.Replaying);
  }

  stopReplay() {
    // todo notify background
    this.update('mode', DevtoolsMode.Off);
  }

  private recorder(req: Request) {
    // todo this should come from outer options
    const mimeType = req?.response?.content?.mimeType;
    if ('application/json' !== mimeType) {
      return;
    }
    const handleContent = async (content: string) => {
      const {method, url} = req.request;
      const key = `${method}:${url}`;
      this.#cache.add(key);
      await chrome.storage.local
        .set({[key]: content})
        .catch(err => console.log('Failed to save cache', err))
      this.update('size', this.#cache.size);
    }
    req.getContent(handleContent);
  }


  private update(key: keyof DevToolsState, value: DevToolsState[keyof DevToolsState]) {
    this.#change$.next({...this.#change$.getValue(), [key]: value});
  }
}
