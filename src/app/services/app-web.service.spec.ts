import { TestBed } from '@angular/core/testing';

import { AppWebService } from './app-web.service';

describe('AppWebService', () => {
  let service: AppWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
