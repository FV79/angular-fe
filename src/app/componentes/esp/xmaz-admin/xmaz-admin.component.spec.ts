import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XmazAdminComponent } from './xmaz-admin.component';

describe('XmazAdminComponent', () => {
  let component: XmazAdminComponent;
  let fixture: ComponentFixture<XmazAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XmazAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XmazAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
