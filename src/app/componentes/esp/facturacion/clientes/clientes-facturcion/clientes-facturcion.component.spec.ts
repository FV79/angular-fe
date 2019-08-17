import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesFacturcionComponent } from './clientes-facturcion.component';

describe('ClientesFacturcionComponent', () => {
  let component: ClientesFacturcionComponent;
  let fixture: ComponentFixture<ClientesFacturcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesFacturcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesFacturcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
