import { TestBed } from '@angular/core/testing';

import { EstadoProyectoInvestigacionService } from './estado-proyecto-investigacion.service';

describe('EstadoProyectoInvestigacionService', () => {
  let service: EstadoProyectoInvestigacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoProyectoInvestigacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
