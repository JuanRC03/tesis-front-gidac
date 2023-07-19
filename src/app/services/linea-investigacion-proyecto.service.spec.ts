import { TestBed } from '@angular/core/testing';

import { LineaInvestigacionProyectoService } from './linea-investigacion-proyecto.service';

describe('LineaInvestigacionProyectoService', () => {
  let service: LineaInvestigacionProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LineaInvestigacionProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
