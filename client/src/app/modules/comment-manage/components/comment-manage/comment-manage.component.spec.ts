import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentManageComponent } from './comment-manage.component';

describe('CommentManageComponent', () => {
  let component: CommentManageComponent;
  let fixture: ComponentFixture<CommentManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
