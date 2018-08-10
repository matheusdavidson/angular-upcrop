import { TestBed, inject } from '@angular/core/testing';

import { AngularUpcropService } from './angular-upcrop.service';

describe('AngularUpcropService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularUpcropService]
    });
  });

  it('should be created', inject([AngularUpcropService], (service: AngularUpcropService) => {
    expect(service).toBeTruthy();
  }));
});
