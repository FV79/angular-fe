import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosFactComponent } from './productos-fact.component';

describe('ProductosFactComponent', () => {
  let component: ProductosFactComponent;
  let fixture: ComponentFixture<ProductosFactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosFactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosFactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
