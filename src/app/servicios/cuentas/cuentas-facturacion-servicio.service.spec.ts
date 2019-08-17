import { TestBed } from '@angular/core/testing';

import { CuentasFacturacionServicioService } from './cuentas-facturacion-servicio.service';

describe('CuentasFacturacionServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentasFacturacionServicioService = TestBed.get(CuentasFacturacionServicioService);
    expect(service).toBeTruthy();
  });
});
