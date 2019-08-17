import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionFacturacionComponent } from './facturacion-facturacion.component';

describe('FacturacionFacturacionComponent', () => {
  let component: FacturacionFacturacionComponent;
  let fixture: ComponentFixture<FacturacionFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturacionFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturacionFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
