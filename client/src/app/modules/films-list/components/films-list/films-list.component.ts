import { Component, OnInit } from '@angular/core';
import { AuthService } from 'client/src/app/core/services/auth.service';
import { FilmsService } from 'client/src/app/core/services/films.service';
import { ModalService } from 'client/src/app/core/services/modal.service';
import { ROUTES_MAP } from 'client/src/app/routes.map';
import { FilmManageComponent } from '../../../film-manage/components/film-manage/film-manage.component';

@Component( {
	selector: 'app-films-list',
	templateUrl: './films-list.component.html',
	styleUrls: [ './films-list.component.scss' ],
} )
export class FilmsListComponent implements OnInit {

	public routesMap = ROUTES_MAP;
	constructor (
		public auth: AuthService,
		public filmsService: FilmsService,
		public modalService: ModalService,
	) {
		this.filmsService.get().toPromise();
	}

	public ngOnInit (): void {
	}

}
