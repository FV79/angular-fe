import { TestBed } from '@angular/core/testing';

import { PaquetesFacturacionServicioService } from './paquetes-facturacion-servicio.service';

describe('PaquetesFacturacionServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaquetesFacturacionServicioService = TestBed.get(PaquetesFacturacionServicioService);
    expect(service).toBeTruthy();
  });
});
