import { TestBed, inject } from '@angular/core/testing';

import { OmniService } from './omni.service';

describe('OmniService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OmniService]
    });
  });

  it('should be created', inject([OmniService], (service: OmniService) => {
    expect(service).toBeTruthy();
  }));
});
