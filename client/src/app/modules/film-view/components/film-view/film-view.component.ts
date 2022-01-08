import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmsService } from 'client/src/app/core/services/films.service';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { IFilmVM } from 'shared/models/film';
import { ID } from 'shared/models/generics/id';

@Component( {
	selector: 'app-film-view',
	templateUrl: './film-view.component.html',
	styleUrls: [ './film-view.component.scss' ],
} )
export class FilmViewComponent implements OnInit {

	public readonly film$: Observable<IFilmVM | undefined>;
	constructor (
		public router: Router,
		public route: ActivatedRoute,
		public filmsService: FilmsService,
	) {

		this.film$ = this.route.paramMap.pipe(
			filter( value => value.keys.includes( 'slug' ) ),
			map( value => value.get( 'slug' ) as ID ),
			switchMap( ( filmSlug: ID ) =>
				combineLatest( [
					this.filmsService.data$.pipe( map( films => films.find( f => f.id === filmSlug ) ) ),
					this.filmsService.getCommentsByFilmId( filmSlug ),
				] ).pipe( map( ( [ film, comments ] ) => ( { ...film, comments } as IFilmVM ) ) )
			)
		);
	}

	ngOnInit (): void {
	}

}
