import { TestBed, inject } from '@angular/core/testing';

import { UpcropService } from './upcrop.service';

describe('UpcropService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpcropService]
    });
  });

  it('should be created', inject([UpcropService], (service: UpcropService) => {
    expect(service).toBeTruthy();
  }));
});
