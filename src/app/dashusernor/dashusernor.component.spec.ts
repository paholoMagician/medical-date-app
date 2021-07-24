import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashusernorComponent } from './dashusernor.component';

describe('DashusernorComponent', () => {
  let component: DashusernorComponent;
  let fixture: ComponentFixture<DashusernorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashusernorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashusernorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
