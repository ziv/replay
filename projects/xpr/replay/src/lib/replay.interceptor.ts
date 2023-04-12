import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';

export type Req = HttpRequest<unknown>;

export enum ReplayMode {
  Noop,
  Recording,
  Replaying
}

export interface ReplayOptions {
  mode: ReplayMode;
}

const filterRequests = (req: Req) => req.responseType === 'json';

@Injectable({providedIn: 'root'})
export class ReplayInterceptor implements HttpInterceptor {
  cache = new Map<string, unknown>();

  opts: ReplayOptions = {
    mode: ReplayMode.Noop
  };

  get isRecord() {
    return this.opts.mode === ReplayMode.Recording;
  }

  get isReplay() {
    return this.opts.mode === ReplayMode.Replaying;
  }

  constructor() {
    // @ts-ignore
    window['zi'] = window['zi'] || {};
    // @ts-ignore
    window['zi']['replay'] = this;
  }

  intercept(request: Req, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // recording mode
    if (this.isRecord && filterRequests(request)) {
      return next.handle(request).pipe(
        tap(e => {
          if (e instanceof HttpResponse) {
            this.cache.set(request.url, e);
          }
        })
      );
    }
    // replaying mode
    if (this.isReplay && this.cache.has(request.url)) {
      return of(this.cache.get(request.url) as HttpResponse<unknown>);
    }
    // default mode
    return next.handle(request);
  }

  stop() {
    this.opts.mode = ReplayMode.Noop;
  }

  record() {
    this.opts.mode = ReplayMode.Recording;
  }

  replay() {
    this.opts.mode = ReplayMode.Replaying;
  }

  status() {
    console.log('ZI Replay mode: ', this.opts.mode);
  }
}
