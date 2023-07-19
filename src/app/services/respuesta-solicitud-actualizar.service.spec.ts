import { TestBed } from '@angular/core/testing';

import { RespuestaSolicitudActualizarService } from './respuesta-solicitud-actualizar.service';

describe('RespuestaSolicitudActualizarService', () => {
  let service: RespuestaSolicitudActualizarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespuestaSolicitudActualizarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
