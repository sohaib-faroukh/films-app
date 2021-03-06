import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES_MAP } from '../../routes.map';
import { SharedModule } from '../../shared/shared.module';
import { FilmsListComponent } from './components/films-list/films-list.component';


const routes: Routes = [
	{
		path: ROUTES_MAP.empty, children: [
			{ path: ROUTES_MAP.empty, pathMatch: 'full', component: FilmsListComponent },
			// { path: '/:id', pathMatch: 'full', loadChildren: () => import( '../../modules/films-list/films-list.module' ).then( m => m.FilmsListModule ) },

		],
	},
];
@NgModule( {
	declarations: [
		FilmsListComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		SharedModule,
	],
} )
export class FilmsListModule { }
