import { TestBed } from '@angular/core/testing';

import { EstadoSolicitudActualizarService } from './estado-solicitud-actualizar.service';

describe('EstadoSolicitudActualizarService', () => {
  let service: EstadoSolicitudActualizarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoSolicitudActualizarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
