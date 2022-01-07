import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { RouterModule } from '@angular/router';
import { ROUTES_MAP } from '../../routes.map';
import { SharedModule } from '../../shared/shared.module';



@NgModule( {
	declarations: [
		FilmsListComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild( [
			{
				path: ROUTES_MAP.empty, children: [
					{ path: ROUTES_MAP.empty, pathMatch: 'full', component: FilmsListComponent },
				],
			},
		] ),
		SharedModule,
	],
} )
export class FilmsListModule { }
