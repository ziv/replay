import { TestBed } from '@angular/core/testing';
import { ReplayInterceptor } from './replay.interceptor';

describe('ReplayInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ReplayInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ReplayInterceptor = TestBed.inject(ReplayInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
