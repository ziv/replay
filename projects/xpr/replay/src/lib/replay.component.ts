import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'xpr-replay',
  template: `
    <div>
      <button (click)="action()">x</button>
      mode {{opened | json }}
    </div>`,
  styles: [''],
  imports: [JsonPipe]
})
export default class ReplayComponent {
  opened = false;

  action() {
    this.opened = !this.opened;
    console.log('XXX');
  }
}


/*
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
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
        <button (click)="opened=true">open</button>
        {{opened | json}}
      </section>
      <!--          </ng-container>-->
    </div>`,
  styles: [`
    :host {
      /!*position: absolute;*!/
      z-index: 1000;
      display: block;
      /!*height: 50px;*!/
      /!*width: 50px;*!/
      border: 5px solid red;
      background: palegoldenrod;
    }

    div {
      display: flex;
    }
  `]
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
}*/
