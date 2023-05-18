import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {DevToolsState} from 'chrome-api';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  s?: DevToolsState;

  @Input() set state(s: DevToolsState) {
    this.s = s;
    this.cdr.detectChanges();
  }

  constructor(private readonly cdr: ChangeDetectorRef) {
  }
}
