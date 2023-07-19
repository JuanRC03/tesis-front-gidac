import { TestBed } from '@angular/core/testing';

import { DatoRecolectadoService } from './dato-recolectado.service';

describe('DatoRecolectadoService', () => {
  let service: DatoRecolectadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatoRecolectadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
