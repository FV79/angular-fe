import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaInicioComponent } from './empresa-inicio.component';

describe('EmpresaInicioComponent', () => {
  let component: EmpresaInicioComponent;
  let fixture: ComponentFixture<EmpresaInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
