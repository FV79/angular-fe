import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesFacturaComponent } from './reportes-factura.component';

describe('ReportesFacturaComponent', () => {
  let component: ReportesFacturaComponent;
  let fixture: ComponentFixture<ReportesFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
