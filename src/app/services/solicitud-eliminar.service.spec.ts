import { TestBed } from '@angular/core/testing';

import { SolicitudEliminarService } from './solicitud-eliminar.service';

describe('SolicitudEliminarService', () => {
  let service: SolicitudEliminarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudEliminarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
