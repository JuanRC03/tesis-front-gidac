import { TestBed } from '@angular/core/testing';

import { CatalogoOrganizacionService } from './catalogo-organizacion.service';

describe('CatalogoOrganizacionService', () => {
  let service: CatalogoOrganizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogoOrganizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
