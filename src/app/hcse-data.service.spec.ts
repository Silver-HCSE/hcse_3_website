import { TestBed } from '@angular/core/testing';

import { HcseDataService } from './hcse-data.service';

describe('HcseDataService', () => {
  let service: HcseDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HcseDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should compute norms properly', () => {
    expect(service.norm
});
