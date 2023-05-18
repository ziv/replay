import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

type Res = HttpResponse<unknown>;

type ResponseInit<T = unknown> = {
  body?: T | null;
  headers?: HttpHeaders;
  status?: number;
  statusText?: string;
  url?: string;
};

export enum ReplayMode {
  Noop = 'Off',
  Recording = 'Recording',
  Replaying = 'Replaying'
}

const STORAGE_KEY = '__NG_REPLY_STORAGE';

const safeParse = <T>(str: string): T[] => {
  try {
    return JSON.parse(str) as T[];
  } catch (e) {
    return [] as T[];
  }
}

@Injectable()
export default class ReplayService {
  mode = ReplayMode.Noop;
  cache = new Map<string, [Res, number]>();

  get off() {
    return this.mode === ReplayMode.Noop;
  }

  get isRecording() {
    return this.mode === ReplayMode.Recording;
  }

  get isReplay() {
    return this.mode === ReplayMode.Replaying;
  }

  // media

  stop() {
    this.mode = ReplayMode.Noop;
  }

  record() {
    this.mode = ReplayMode.Recording;
  }

  replay() {
    this.mode = ReplayMode.Replaying;
  }

  // storage

  set(key: string, value: Res) {
    this.cache.set(key, [value, 0]);
  }

  get(key: string) {
    const v = this.cache.get(key);
    if (v) {
      const [res, count] = v;
      this.cache.set(key, [res, count+ 1]);
      return res;
    }
    return undefined;
  }

  clearCache() {
    this.cache = new Map<string, [Res, number]>();
  }

  clearStorage() {
    localStorage.setItem(STORAGE_KEY, '[]');
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...this.cache.entries()]));
  }

  load() {
    const str = localStorage.getItem(STORAGE_KEY) as string || '[]';
    const items = safeParse<[string, [ResponseInit, number]]>(str);
    for (let i = 0; i < items.length; ++i) {
      const [key, val] = items[i];
      this.cache.set(key, [new HttpResponse(val[0]), val[1]]);
    }
  }
}
