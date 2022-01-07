import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmViewComponent } from './film-view.component';

describe('FilmViewComponent', () => {
  let component: FilmViewComponent;
  let fixture: ComponentFixture<FilmViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
