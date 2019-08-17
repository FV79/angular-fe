import { TestBed } from '@angular/core/testing';

import { FacturacionFacturacionServicioService } from './facturacion-facturacion-servicio.service';

describe('FacturacionFacturacionServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacturacionFacturacionServicioService = TestBed.get(FacturacionFacturacionServicioService);
    expect(service).toBeTruthy();
  });
});
