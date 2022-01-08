import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentManageComponent } from './components/comment-manage/comment-manage.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule( {
	declarations: [
		CommentManageComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		CommentManageComponent,
	],
} )
export class CommentManageModule { }
