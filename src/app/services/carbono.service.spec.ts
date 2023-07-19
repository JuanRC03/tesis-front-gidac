import { TestBed } from '@angular/core/testing';

import { CarbonoService } from './carbono.service';

describe('CarbonoService', () => {
  let service: CarbonoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarbonoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
