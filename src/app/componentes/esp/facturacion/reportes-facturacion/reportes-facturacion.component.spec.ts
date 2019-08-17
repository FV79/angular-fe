import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesFacturacionComponent } from './reportes-facturacion.component';

describe('ReportesFacturacionComponent', () => {
  let component: ReportesFacturacionComponent;
  let fixture: ComponentFixture<ReportesFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
