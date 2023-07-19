import { TestBed } from '@angular/core/testing';

import { InstitucionParticipanteService } from './institucion-participante.service';

describe('InstitucionParticipanteService', () => {
  let service: InstitucionParticipanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitucionParticipanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
