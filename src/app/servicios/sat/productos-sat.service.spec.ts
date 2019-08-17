import { TestBed } from '@angular/core/testing';

import { ProductosSatService } from './productos-sat.service';

describe('ProductosSatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductosSatService = TestBed.get(ProductosSatService);
    expect(service).toBeTruthy();
  });
});
