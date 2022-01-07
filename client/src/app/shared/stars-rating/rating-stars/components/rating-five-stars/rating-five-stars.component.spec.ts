import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingFiveStarsComponent } from './rating-five-stars.component';

describe('RatingFiveStarsComponent', () => {
  let component: RatingFiveStarsComponent;
  let fixture: ComponentFixture<RatingFiveStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingFiveStarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingFiveStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
