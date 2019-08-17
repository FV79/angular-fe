import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesProductosComponent } from './reportes-productos.component';

describe('ReportesProductosComponent', () => {
  let component: ReportesProductosComponent;
  let fixture: ComponentFixture<ReportesProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
