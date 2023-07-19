import { TestBed } from '@angular/core/testing';

import { TipoVariableService } from './tipo-variable.service';

describe('TipoVariableService', () => {
  let service: TipoVariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoVariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
