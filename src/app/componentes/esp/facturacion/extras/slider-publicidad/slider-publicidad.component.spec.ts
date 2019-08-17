import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderPublicidadComponent } from './slider-publicidad.component';

describe('SliderPublicidadComponent', () => {
  let component: SliderPublicidadComponent;
  let fixture: ComponentFixture<SliderPublicidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderPublicidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderPublicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
