import { TestBed } from '@angular/core/testing';

import { ProfundidadService } from './profundidad.service';

describe('ProfundidadService', () => {
  let service: ProfundidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfundidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
