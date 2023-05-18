import { HttpHeaders, HttpResponse } from '@angular/common/http';

export type Res = HttpResponse<unknown>;

export type ResponseInit<T = unknown> = {
  body?: T | null;
  headers?: HttpHeaders;
  status?: number;
  statusText?: string;
  url?: string;
};

const STORAGE_KEY = '__NG_REPLY_STORAGE';

let cache = new Map<string, [Res, number]>();

export const set = (key: string, value: Res) => cache.set(key, [value, 0]);

export const get = (key: string) => {
  const v = cache.get(key);
  if (v) {
    const [res, count] = v;
    cache.set(key, [res, count+ 1]);
    return res;
  }
  return undefined;
}

export const clearCache = () => cache = new Map<string, [Res, number]>();

export const clearStorage = () => localStorage.removeItem(STORAGE_KEY);

export const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify([...cache.entries()]));

export const load = () => {
  const str = localStorage.getItem(STORAGE_KEY) as string || '[]';
  const items = safeParse<[string, [ResponseInit, number]]>(str);
  for (let i = 0; i < items.length; ++i) {
    const [key, val] = items[i];
    cache.set(key, [new HttpResponse(val[0]), val[1]]);
  }
};

const safeParse = <T>(str: string): T[] => {
  try {
    return JSON.parse(str) as T[];
  } catch (e) {
    return [] as T[];
  }
}
