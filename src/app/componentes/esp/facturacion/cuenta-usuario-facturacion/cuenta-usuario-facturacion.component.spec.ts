import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaUsuarioFacturacionComponent } from './cuenta-usuario-facturacion.component';

describe('CuentaUsuarioFacturacionComponent', () => {
  let component: CuentaUsuarioFacturacionComponent;
  let fixture: ComponentFixture<CuentaUsuarioFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaUsuarioFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaUsuarioFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
