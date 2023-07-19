import { TestBed } from '@angular/core/testing';

import { SectorImpactoProyectoService } from './sector-impacto-proyecto.service';

describe('SectorImpactoProyectoService', () => {
  let service: SectorImpactoProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectorImpactoProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
