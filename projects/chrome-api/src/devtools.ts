import {type DevtoolsApi, DevtoolsCli, type ORIGIN} from './devtools-api';

export function devtools(): any {
  console.log('chrome.devtools.inspectedWindow.tabId', chrome.devtools.inspectedWindow.tabId);
  // const dt = new DevtoolsCli(origin);
  // const startRecord = dt.startRecord.bind(dt);
  // const stopRecord = dt.stopRecord.bind(dt);
  // const startReplay = dt.startReplay.bind(dt);
  // const stopReplay = dt.stopReplay.bind(dt);
  // return {
  //   changes: dt.changes,
  //   startRecord,
  //   stopRecord,
  //   startReplay,
  //   stopReplay
  // };
}
