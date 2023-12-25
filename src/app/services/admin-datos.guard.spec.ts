import { TestBed } from '@angular/core/testing';

import { AdminDatosGuard } from './admin-datos.guard';

describe('AdminDatosGuard', () => {
  let guard: AdminDatosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminDatosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
