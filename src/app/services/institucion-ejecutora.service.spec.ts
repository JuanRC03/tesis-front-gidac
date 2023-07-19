import { TestBed } from '@angular/core/testing';

import { InstitucionEjecutoraService } from './institucion-ejecutora.service';

describe('InstitucionEjecutoraService', () => {
  let service: InstitucionEjecutoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitucionEjecutoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
