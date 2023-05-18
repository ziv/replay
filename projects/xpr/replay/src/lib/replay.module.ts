import { ClassProvider, FactoryProvider, Inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { ReplayInterceptor } from './replay.interceptor';
import { ReplayUiComponent } from './replay-ui.component';
import ReplayApiProvider, { type ReplayApi } from './replay-api.provider';

// register ReplayInterceptor as HTTP interceptor
export const InterceptorsProvider: ClassProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ReplayInterceptor,
  multi: true,
}

// override default injector to get it from the interceptors list instead of instantiate new one
export const ReplayProviders: FactoryProvider = {
  provide: ReplayInterceptor,
  deps: [HTTP_INTERCEPTORS],
  useFactory: (interceptors: HttpInterceptor[]) => interceptors.find(i => i instanceof ReplayInterceptor) as ReplayInterceptor
}

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
  ],
  declarations: [
    ReplayUiComponent,
  ],
  providers: [
    InterceptorsProvider,
    ReplayProviders,
    ReplayApiProvider,
  ]
})
export class ReplayModule {
  constructor(@Inject('ReplayApi') readonly api: ReplayApi) {
    // exports devtools API
    (window as any)['ngReplay'] = api;
  }
}
