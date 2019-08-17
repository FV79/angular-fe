import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominasFacturacionComponent } from './nominas-facturacion.component';

describe('NominasFacturacionComponent', () => {
  let component: NominasFacturacionComponent;
  let fixture: ComponentFixture<NominasFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominasFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominasFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
