import { TestBed } from '@angular/core/testing';

import { ProductosFacturacionServicioService } from './productos-facturacion-servicio.service';

describe('ProductosFacturacionServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductosFacturacionServicioService = TestBed.get(ProductosFacturacionServicioService);
    expect(service).toBeTruthy();
  });
});
