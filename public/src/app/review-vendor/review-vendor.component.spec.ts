import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewVendorComponent } from './review-vendor.component';

describe('ReviewVendorComponent', () => {
  let component: ReviewVendorComponent;
  let fixture: ComponentFixture<ReviewVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
