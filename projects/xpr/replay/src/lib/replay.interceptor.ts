import { Observable, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import ReplayService from './replay.service';

@Injectable()
export default class ReplayInterceptor implements HttpInterceptor {
  constructor(private readonly service: ReplayService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ('GET' !== request.method) {
      return next.handle(request);
    }
    const replay = this.service;

    if (replay.isRecording) {
      return next.handle(request).pipe(
        tap(e => {
          if (e instanceof HttpResponse) {
            replay.set(request.url, e);
          }
        })
      );
    }

    if (replay.isReplay) {
      const res = replay.get(request.url);
      if (res) {
        return of(res.clone());
      }
    }

    return next.handle(request);
  }
}
