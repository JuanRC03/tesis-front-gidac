import { TestBed } from '@angular/core/testing';

import { TiempoEdicionDatoService } from './tiempo-edicion-dato.service';

describe('TiempoEdicionDatoService', () => {
  let service: TiempoEdicionDatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiempoEdicionDatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
