import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadMedidaSatComponent } from './unidad-medida-sat.component';

describe('UnidadMedidaSatComponent', () => {
  let component: UnidadMedidaSatComponent;
  let fixture: ComponentFixture<UnidadMedidaSatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadMedidaSatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadMedidaSatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
