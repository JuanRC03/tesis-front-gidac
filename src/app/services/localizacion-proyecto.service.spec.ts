import { TestBed } from '@angular/core/testing';

import { LocalizacionProyectoService } from './localizacion-proyecto.service';

describe('LocalizacionProyectoService', () => {
  let service: LocalizacionProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalizacionProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
