import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAutomaticoComponent } from './modal-automatico.component';

describe('ModalAutomaticoComponent', () => {
  let component: ModalAutomaticoComponent;
  let fixture: ComponentFixture<ModalAutomaticoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAutomaticoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAutomaticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
