import { TestBed } from '@angular/core/testing';

import { UnidadmedidadService } from './unidadmedidad.service';

describe('UnidadmedidadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnidadmedidadService = TestBed.get(UnidadmedidadService);
    expect(service).toBeTruthy();
  });
});
