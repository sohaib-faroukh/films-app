import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmViewComponent } from './components/film-view/film-view.component';
import { ROUTES_MAP } from '../../routes.map';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CommentsListModule } from '../comments-list/comments-list.module';


const routes: Routes = [
	{
		path: ROUTES_MAP.empty, children: [
			{ path: ROUTES_MAP.empty, pathMatch: 'full', component: FilmViewComponent },
		],
	},
];

@NgModule( {
	declarations: [
		FilmViewComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		SharedModule,
		CommentsListModule,
	],
} )
export class FilmViewModule { }
