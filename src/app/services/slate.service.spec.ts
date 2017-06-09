import { TestBed, inject } from '@angular/core/testing';

import { SlateService } from './slate.service';

describe('SlateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlateService]
    });
  });

  it('should ...', inject([SlateService], (service: SlateService) => {
    expect(service).toBeTruthy();
  }));
});
