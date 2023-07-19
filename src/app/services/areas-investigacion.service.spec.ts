import { TestBed } from '@angular/core/testing';

import { AreasInvestigacionService } from './areas-investigacion.service';

describe('AreasInvestigacionService', () => {
  let service: AreasInvestigacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreasInvestigacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
