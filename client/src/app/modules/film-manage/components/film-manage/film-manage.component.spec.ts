import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmManageComponent } from './film-manage.component';

describe('FilmManageComponent', () => {
  let component: FilmManageComponent;
  let fixture: ComponentFixture<FilmManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
