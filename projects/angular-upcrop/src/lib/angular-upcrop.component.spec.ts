import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularUpcropComponent } from './angular-upcrop.component';

describe('AngularUpcropComponent', () => {
  let component: AngularUpcropComponent;
  let fixture: ComponentFixture<AngularUpcropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularUpcropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularUpcropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
