import { TestBed } from '@angular/core/testing';
import ReplayInterceptor from './replay.interceptor';
import ReplayService from './replay.service';

describe('ReplayInterceptor', () => {
  let service: ReplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReplayInterceptor,
        {
          provide: ReplayService,
          useFactory: () => {
            service = {} as ReplayService;
            return service;
          }
        }
      ]
    })
  });

  it('should be created', () => {
    const interceptor: ReplayInterceptor = TestBed.inject(ReplayInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
