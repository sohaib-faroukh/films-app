import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_MAP } from '../../routes.map';
import { SharedModule } from '../../shared/shared.module';
import { FilmManageComponent } from './components/film-manage/film-manage.component';


const routes: Routes = [
	{
		path: ROUTES_MAP.empty, children: [
			{ path: ROUTES_MAP.empty, pathMatch: 'full', component: FilmManageComponent },
		],
	},
];

@NgModule( {
	declarations: [
		FilmManageComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		SharedModule,
	],
} )
export class FilmManageModule { }
