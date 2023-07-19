import { TestBed } from '@angular/core/testing';

import { EquivalenciaVariableService } from './equivalencia-variable.service';

describe('EquivalenciaVariableService', () => {
  let service: EquivalenciaVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquivalenciaVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
