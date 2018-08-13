import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcropCropComponent } from './upcrop-crop.component';

describe('UpcropCropComponent', () => {
  let component: UpcropCropComponent;
  let fixture: ComponentFixture<UpcropCropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcropCropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcropCropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
