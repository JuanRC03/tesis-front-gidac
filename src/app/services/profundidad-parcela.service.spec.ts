import { TestBed } from '@angular/core/testing';

import { ProfundidadParcelaService } from './profundidad-parcela.service';

describe('ProfundidadParcelaService', () => {
  let service: ProfundidadParcelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfundidadParcelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
