import { TestBed } from '@angular/core/testing';

import { AreaInvestigacionProyectoService } from './area-investigacion-proyecto.service';

describe('AreaInvestigacionProyectoService', () => {
  let service: AreaInvestigacionProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaInvestigacionProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
