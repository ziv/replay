import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {DevtoolsActions, DevtoolsMode, DevToolsState} from 'chrome-api';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {
  canRecord = false;
  canReplay = false;
  actions = DevtoolsActions;

  @Input() set state(s: DevToolsState) {
    this.canRecord = s.mode === DevtoolsMode.Off;
    this.canReplay = this.canRecord && s.size > 0;
    this.cdr.detectChanges();
  }

  @Output() action = new EventEmitter<DevtoolsActions>();

  constructor(private readonly cdr: ChangeDetectorRef) {
  }
}
