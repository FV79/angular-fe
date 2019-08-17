import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddendasFacturacionComponent } from './addendas-facturacion.component';

describe('AddendasFacturacionComponent', () => {
  let component: AddendasFacturacionComponent;
  let fixture: ComponentFixture<AddendasFacturacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddendasFacturacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddendasFacturacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
