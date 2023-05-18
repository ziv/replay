import { ApplicationRef, createComponent, Inject, isDevMode, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import ReplayInterceptor from './replay.interceptor';
import ReplayApiProvider, { type ReplayApi } from './replay-api.provider';
import ReplayService from './replay.service';
import ReplayComponent from './replay.component';

export interface ReplayOptions {
  skipDevtools: boolean;
}

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    ReplayService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ReplayInterceptor,
      multi: true,
    },
    ReplayApiProvider,
  ],
})
export class ReplayModule {
  constructor(@Inject('ReplayApi') readonly api: ReplayApi,
              app: ApplicationRef,
              @Inject('NgReplayOptions') @Optional() readonly options?: Partial<ReplayOptions>) {
    if (!isDevMode()) {
      throw new Error('Remove this module at production')
    }
    // default options
    const {skipDevtools = false} = options || {};
    // apply options
    if (!skipDevtools) {
      // exports devtools API
      (window as any)['ngReplay'] = api;
      (window as any)['app'] = app;
      (window as any)['ziv'] = () => {
        // const root = app.components[0].location.nativeElement as HTMLElement;
        // const hostElement = document.createElement('div');
        // root.appendChild(hostElement);
        // Get an `EnvironmentInjector` instance from the `ApplicationRef`.
        const hostElement = document.getElementById('ph') as HTMLElement;
        const environmentInjector = app.injector;
        const cmp = createComponent(ReplayComponent, {environmentInjector, hostElement})
        app.attachView(cmp.hostView);
        console.log(cmp);
        // console.log(el);
      };
    }

  }
}
