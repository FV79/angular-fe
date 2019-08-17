import { TestBed } from '@angular/core/testing';

import { NominasFacturacionServicioService } from './nominas-facturacion-servicio.service';

describe('NominasFacturacionServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NominasFacturacionServicioService = TestBed.get(NominasFacturacionServicioService);
    expect(service).toBeTruthy();
  });
});
