/// <reference types="@types/chrome" />
import { Component } from '@angular/core';
import Request = chrome.devtools.network.Request;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  log: string[] = [];
  recording = false;

  record() {
    this.recording = true;
    const callback = (r: Request) => {

    };
    chrome.devtools.network.onRequestFinished.addListener(callback);
  }

  stop() {
    this.recording = false;
    // chrome.devtools.network.onRequestFinished.removeListener()
  }

  replay() {
    console.log('replay');
  }
}
