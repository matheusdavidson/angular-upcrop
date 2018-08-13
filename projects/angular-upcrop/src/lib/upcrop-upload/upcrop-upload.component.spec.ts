import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcropUploadComponent } from './upcrop-upload.component';

describe('UpcropUploadComponent', () => {
  let component: UpcropUploadComponent;
  let fixture: ComponentFixture<UpcropUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcropUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcropUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
