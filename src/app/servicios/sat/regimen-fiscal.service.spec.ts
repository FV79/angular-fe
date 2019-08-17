import { TestBed } from '@angular/core/testing';

import { RegimenFiscalService } from './regimen-fiscal.service';

describe('RegimenFiscalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegimenFiscalService = TestBed.get(RegimenFiscalService);
    expect(service).toBeTruthy();
  });
});
