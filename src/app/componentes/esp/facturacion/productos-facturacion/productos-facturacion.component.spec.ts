import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosFacturacionComponent } from './productos-facturacion.component';

describe('ProductosFacturacionComponent', () => {
  let component: ProductosFacturacionComponent;
  let fixture: ComponentFixture<ProductosFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
