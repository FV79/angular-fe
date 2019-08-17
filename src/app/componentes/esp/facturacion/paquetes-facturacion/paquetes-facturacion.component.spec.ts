import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaquetesFacturacionComponent } from './paquetes-facturacion.component';

describe('PaquetesFacturacionComponent', () => {
  let component: PaquetesFacturacionComponent;
  let fixture: ComponentFixture<PaquetesFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaquetesFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaquetesFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
