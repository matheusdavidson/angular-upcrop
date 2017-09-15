import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcropDialogComponent } from './upcrop-dialog.component';

describe('UpcropDialogComponent', () => {
  let component: UpcropDialogComponent;
  let fixture: ComponentFixture<UpcropDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcropDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcropDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
