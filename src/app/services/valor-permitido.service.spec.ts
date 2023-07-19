import { TestBed } from '@angular/core/testing';

import { ValorPermitidoService } from './valor-permitido.service';

describe('ValorPermitidoService', () => {
  let service: ValorPermitidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValorPermitidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
