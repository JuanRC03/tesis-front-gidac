import { TestBed } from '@angular/core/testing';

import { EmailEnvioService } from './email-envio.service';

describe('EmailEnvioService', () => {
  let service: EmailEnvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailEnvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
