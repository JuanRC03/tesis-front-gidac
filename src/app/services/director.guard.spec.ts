import { TestBed } from '@angular/core/testing';

import { DirectorGuard } from './director.guard';

describe('DirectorlGuard', () => {
  let guard: DirectorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DirectorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
