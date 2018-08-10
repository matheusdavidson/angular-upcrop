import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcropComponent } from './upcrop.component';

describe('UpcropComponent', () => {
  let component: UpcropComponent;
  let fixture: ComponentFixture<UpcropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
