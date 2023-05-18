// /// <reference types="@types/chrome" />
// import Request = chrome.devtools.network.Request;
// import {BehaviorSubject} from "rxjs";
//
// export enum Mode {
//   Off = 'off',
//   Recording = 'recording',
//   Replaying = 'replaying'
// }
//
// export interface State {
//   mode: Mode;
//   size: number;
// }
//
// const cache = new Map<string, string>();
// const change$ = new BehaviorSubject<State>({mode: Mode.Off, size: 0});
// const bg = chrome.runtime.connect({name: 'devtools-panel' });
//
// // private API
// // ------------------------------------------------------------------------------------------------
//
// const update = (key: string, value: unknown) => change$.next({...change$.getValue(), [key]: value});
//
// const recordCallback = (r: Request) => {
//   const {request, response} = r;
//   if (!request && !response) {
//     // we do not know what to do in those cases
//     return;
//   }
//   const {content} = response;
//   if (content.mimeType !== 'application/json') {
//     // we are caching only JSON response
//     return;
//   }
//   r.getContent(content => {
//     cache.set(request.url, content);
//     bg.postMessage({
//       action: 'record',
//       url: request.url,
//       method: request.method,
//       content
//     });
//     update('size', cache.size);
//   });
// }
//
//
// bg.onMessage.addListener((msg) => {
//   console.log('incoming to dev page message', msg);
// })
//
// // public API
// // ------------------------------------------------------------------------------------------------
//
// export function startRecord() {
//   chrome.devtools.network.onRequestFinished.addListener(recordCallback);
//   update('mode', Mode.Recording);
// }
//
//
// export function stopRecord() {
//   chrome.devtools.network.onRequestFinished.addListener(recordCallback);
//   update('mode', Mode.Off);
// }
//
// export function getChanges$() {
//   return change$.asObservable();
// }
//
//
// setTimeout(() => {
//   console.log('updating');
//   update('size', 20);
// }, 5000);
