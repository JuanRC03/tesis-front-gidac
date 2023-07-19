import { TestBed } from '@angular/core/testing';

import { InvestigacionInvestigadoresService } from './investigacion-investigadores.service';

describe('InvestigacionInvestigadoresService', () => {
  let service: InvestigacionInvestigadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestigacionInvestigadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
