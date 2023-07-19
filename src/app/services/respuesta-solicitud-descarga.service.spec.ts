import { TestBed } from '@angular/core/testing';

import { RespuestaSolicitudDescargaService } from './respuesta-solicitud-descarga.service';

describe('RespuestaSolicitudDescargaService', () => {
  let service: RespuestaSolicitudDescargaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespuestaSolicitudDescargaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
