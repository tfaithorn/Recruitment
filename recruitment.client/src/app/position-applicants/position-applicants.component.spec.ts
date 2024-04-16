import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionApplicantsComponent } from './position-applicants.component';

describe('PositionApplicantsComponent', () => {
  let component: PositionApplicantsComponent;
  let fixture: ComponentFixture<PositionApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionApplicantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
