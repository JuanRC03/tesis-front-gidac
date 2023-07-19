import { TestBed } from '@angular/core/testing';

import { CatalogoEspochService } from './catalogo-espoch.service';

describe('CatalogoEspochService', () => {
  let service: CatalogoEspochService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogoEspochService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
