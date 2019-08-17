import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuebaDevExpressComponent } from './pueba-dev-express.component';

describe('PuebaDevExpressComponent', () => {
  let component: PuebaDevExpressComponent;
  let fixture: ComponentFixture<PuebaDevExpressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuebaDevExpressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuebaDevExpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
