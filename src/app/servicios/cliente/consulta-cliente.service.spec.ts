import { TestBed } from '@angular/core/testing';

import { ConsultaClienteService } from './consulta-cliente.service';

describe('ConsultaClienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsultaClienteService = TestBed.get(ConsultaClienteService);
    expect(service).toBeTruthy();
  });
});
