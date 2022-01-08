import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule( {
	declarations: [
		CommentsListComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
	],
	exports: [
		CommentsListComponent,
	],
} )
export class CommentsListModule { }
