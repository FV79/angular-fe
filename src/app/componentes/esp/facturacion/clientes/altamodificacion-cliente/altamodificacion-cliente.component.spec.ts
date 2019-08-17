import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltamodificacionClienteComponent } from './altamodificacion-cliente.component';

describe('AltamodificacionClienteComponent', () => {
  let component: AltamodificacionClienteComponent;
  let fixture: ComponentFixture<AltamodificacionClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltamodificacionClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltamodificacionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
