import { TestBed } from '@angular/core/testing';

import { InvestigadorService } from './investigador.service';

describe('InvestigadorService', () => {
  let service: InvestigadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestigadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
