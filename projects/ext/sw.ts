/// <reference types="@types/chrome" />

chrome.runtime.onConnect.addListener(function (dtc) {
  dtc.onMessage.addListener((message: any) => {
    console.log(message);
  })
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  console.log({changes, namespace});
});
console.log('service worker loaded');

export {}

