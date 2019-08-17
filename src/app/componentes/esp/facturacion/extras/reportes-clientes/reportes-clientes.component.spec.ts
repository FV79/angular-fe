import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesClientesComponent } from './reportes-clientes.component';

describe('ReportesClientesComponent', () => {
  let component: ReportesClientesComponent;
  let fixture: ComponentFixture<ReportesClientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesClientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
