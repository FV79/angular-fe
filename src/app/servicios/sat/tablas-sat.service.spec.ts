import { TestBed } from '@angular/core/testing';

import { TablasSatService } from './tablas-sat.service';

describe('TablasSatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TablasSatService = TestBed.get(TablasSatService);
    expect(service).toBeTruthy();
  });
});
