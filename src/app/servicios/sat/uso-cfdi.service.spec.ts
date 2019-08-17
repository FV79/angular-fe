import { TestBed } from '@angular/core/testing';

import { UsoCfdiService } from './uso-cfdi.service';

describe('UsoCfdiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsoCfdiService = TestBed.get(UsoCfdiService);
    expect(service).toBeTruthy();
  });
});
