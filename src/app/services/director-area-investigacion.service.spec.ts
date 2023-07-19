import { TestBed } from '@angular/core/testing';

import { DirectorAreaInvestigacionService } from './director-area-investigacion.service';

describe('DirectorAreaInvestigacionService', () => {
  let service: DirectorAreaInvestigacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectorAreaInvestigacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
