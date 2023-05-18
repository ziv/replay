import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {devtools, DevtoolsActions, DevtoolsMode, DevToolsState} from "chrome-api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  // private devtools = devtools(''); // todo
  private sub?: Subscription;

  state: DevToolsState = {
    mode: DevtoolsMode.Off,
    size: 0,
  };

  get canReplay(): boolean {
    return this.state.mode === DevtoolsMode.Off && this.state.size > 0;
  }

  get canRecord(): boolean {
    return this.state.mode === DevtoolsMode.Off;
  }

  get canStop(): boolean {
    return this.state.mode === DevtoolsMode.Recording;
  }

  constructor(public cdr: ChangeDetectorRef) {
    // devtools('');
  }

  ngOnInit() {
    // this.sub = this.devtools.changes.subscribe(state => {
    //   this.state = state;
    //   this.cdr.detectChanges();
    // });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  handle(action: DevtoolsActions) {
    console.log(action);
  }

  startRecord() {
    // this.devtools.startRecord();
  }

  stopRecord() {
    // this.devtools.stopRecord();
  }

  startReplay() {
    console.log('replay');
  }

  stopReplay() {
    console.log('replay');
  }
}
