import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { get, set } from './storage-api';

export enum ReplayMode {
  Noop = 'Off',
  Recording = 'Recording',
  Replaying = 'Replaying'
}

const filterRequests = (req: HttpRequest<unknown>) => req.responseType === 'json';

@Injectable()
export class ReplayInterceptor implements HttpInterceptor {
  mode = ReplayMode.Noop;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ('GET' !== request.method) {
      return next.handle(request);
    }

    if (this.mode === ReplayMode.Recording && filterRequests(request)) {
      return next.handle(request).pipe(
        tap(e => {
          if (e instanceof HttpResponse) {
            set(request.url, e);
          }
        })
      );
    }

    if (this.mode === ReplayMode.Replaying) {
      const res = get(request.url);
      if (res) {
        return of(res.clone());
      }
    }

    return next.handle(request);
  }

  stop() {
    this.mode = ReplayMode.Noop;
  }

  record() {
    this.mode = ReplayMode.Recording;
  }

  replay() {
    this.mode = ReplayMode.Replaying;
  }
}
