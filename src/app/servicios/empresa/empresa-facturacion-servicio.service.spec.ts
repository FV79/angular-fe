import { TestBed } from '@angular/core/testing';

import { EmpresaFacturacionServicioService } from './empresa-facturacion-servicio.service';

describe('EmpresaFacturacionServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmpresaFacturacionServicioService = TestBed.get(EmpresaFacturacionServicioService);
    expect(service).toBeTruthy();
  });
});
