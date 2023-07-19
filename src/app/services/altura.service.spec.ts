import { TestBed } from '@angular/core/testing';

import { AlturaService } from './altura.service';

describe('AlturaService', () => {
  let service: AlturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
