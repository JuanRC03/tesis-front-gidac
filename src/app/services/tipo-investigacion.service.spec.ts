import { TestBed } from '@angular/core/testing';

import { TipoInvestigacionService } from './tipo-investigacion.service';

describe('TipoInvestigacionService', () => {
  let service: TipoInvestigacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoInvestigacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
