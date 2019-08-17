import { TestBed } from '@angular/core/testing';

import { ReporteFacturacionServicioService } from './reporte-facturacion-servicio.service';

describe('ReporteFacturacionServicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReporteFacturacionServicioService = TestBed.get(ReporteFacturacionServicioService);
    expect(service).toBeTruthy();
  });
});
