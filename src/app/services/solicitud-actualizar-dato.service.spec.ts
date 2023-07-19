import { TestBed } from '@angular/core/testing';

import { SolicitudActualizarDatoService } from './solicitud-actualizar-dato.service';

describe('SolicitudActualizarDatoService', () => {
  let service: SolicitudActualizarDatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudActualizarDatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
