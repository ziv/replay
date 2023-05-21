import { Inject, isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import ReplayInterceptor from './replay.interceptor';
import ReplayApiProvider, { type ReplayApi } from './replay-api.provider';
import ReplayService from './replay.service';

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
  constructor(@Inject('ReplayApi') readonly api: ReplayApi) {
    if (!isDevMode()) {
      throw new Error('Remove this module at production')
    }
    // exports devtools API
    (window as any)['ngReplay'] = api;

  }
}
