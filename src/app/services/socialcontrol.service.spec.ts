import { TestBed } from '@angular/core/testing';

import { SocialcontrolService } from './socialcontrol.service';

describe('SocialcontrolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialcontrolService = TestBed.get(SocialcontrolService);
    expect(service).toBeTruthy();
  });
});
