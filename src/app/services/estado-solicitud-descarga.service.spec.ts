import { TestBed } from '@angular/core/testing';

import { EstadoSolicitudDescargaService } from './estado-solicitud-descarga.service';

describe('EstadoSolicitudDescargaService', () => {
  let service: EstadoSolicitudDescargaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoSolicitudDescargaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
