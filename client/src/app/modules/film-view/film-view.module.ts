import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmViewComponent } from './components/film-view/film-view.component';
import { ROUTES_MAP } from '../../routes.map';
import { RouterModule, Routes } from '@angular/router';


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
	],
} )
export class FilmViewModule { }
