import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { NavbarModule } from '../../modules/navbar/navbar.module';
import { ROUTES_MAP } from '../../routes.map';
import { ClientLayoutComponent } from './client-layout.component';

const routes: Routes = [
	{
		path: ROUTES_MAP.empty, component: ClientLayoutComponent, children: [
			{ path: ROUTES_MAP.empty, pathMatch: 'full', redirectTo: ROUTES_MAP.films },
			{ path: ROUTES_MAP.films, loadChildren: () => import( '../../modules/films-list/films-list.module' ).then( m => m.FilmsListModule ) },
			{ path: ROUTES_MAP.films + '/create', pathMatch: 'full', canLoad: [ AuthGuard ], loadChildren: () => import( '../../modules/film-manage/film-manage.module' ).then( m => m.FilmManageModule ) },
			{ path: ROUTES_MAP.films + '/:slug', pathMatch: 'full', loadChildren: () => import( '../../modules/film-view/film-view.module' ).then( m => m.FilmViewModule ) },
		],
	},
];

@NgModule( {
	declarations: [ ClientLayoutComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		NavbarModule,
	],
} )
export class ClientLayoutModule { }
