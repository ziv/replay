import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { ReplayApi } from './replay-api.provider';

@Component({
  selector: 'xpr-replay',
  template: `
    <div>
      <ng-container *ngIf="opened">
        <section>
          <button (click)="stop()">⏹</button>
          <button (click)="record()">⏺</button>
          <button (click)="record()">⏵</button>
        </section>
        <section>
          <button (click)="record()">↓</button>
          <button (click)="record()">↑</button>
        </section>
        <section>
          <button (click)="record()">clear all</button>
          <button (click)="record()">clear cache</button>
          <button (click)="record()">clear storage</button>
        </section>
        <section>
          <button (click)="record()">help</button>
        </section>
        <section>
          <button (click)="opened=false">close</button>
        </section>
      </ng-container>
      <!--          <ng-container *ngIf="!opened">-->
      <section>
        <button (click)="open()">open</button>
        <p>{{opened | json}}</p>
      </section>
      <!--          </ng-container>-->
    </div>`,
  styles: [`
    :host {
      /*position: absolute;*/
      z-index: 1000;
      display: block;
      /*height: 50px;*/
      /*width: 50px;*/
      border: 5px solid red;
      background: palegoldenrod;
    }

    div {
      display: flex;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReplayUiComponent {
  opened = false;

  constructor(@Inject('ReplayApi') private readonly api: ReplayApi,
              private readonly cdr: ChangeDetectorRef) {
  }

  open() {
    this.opened = true;
    this.cdr.markForCheck();
  }

  stop() {

  }

  record() {

  }
}
