import { TestBed } from '@angular/core/testing';

import { SectorImpactoService } from './sector-impacto.service';

describe('SectorImpactoService', () => {
  let service: SectorImpactoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectorImpactoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
