import { TestBed } from '@angular/core/testing';

import { VariableUnidadMedidaService } from './variable-unidad-medida.service';

describe('VariableUnidadMedidaService', () => {
  let service: VariableUnidadMedidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariableUnidadMedidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
