import { TestBed } from '@angular/core/testing';

import { TipoRelacionService } from './tipo-relacion.service';

describe('TipoRelacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoRelacionService = TestBed.get(TipoRelacionService);
    expect(service).toBeTruthy();
  });
});
