import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AyudaFacturacionComponent } from './ayuda-facturacion.component';

describe('AyudaFacturacionComponent', () => {
  let component: AyudaFacturacionComponent;
  let fixture: ComponentFixture<AyudaFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyudaFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AyudaFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
