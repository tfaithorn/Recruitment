import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyGridComponent } from './fancy-grid.component';

describe('FancyGridComponent', () => {
  let component: FancyGridComponent;
  let fixture: ComponentFixture<FancyGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FancyGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
