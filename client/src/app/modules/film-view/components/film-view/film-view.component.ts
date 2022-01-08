import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'client/src/app/core/services/auth.service';
import { CommentsService } from 'client/src/app/core/services/comments.service';
import { FilmsService } from 'client/src/app/core/services/films.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ICommentVM } from 'shared/models/comment';
import { IFilmVM } from 'shared/models/film';
import { ID } from 'shared/models/generics/id';

@Component( {
	selector: 'app-film-view',
	templateUrl: './film-view.component.html',
	styleUrls: [ './film-view.component.scss' ],
} )
export class FilmViewComponent implements OnInit {

	public film$: Observable<IFilmVM | undefined>;
	public comments$: BehaviorSubject<ICommentVM[]>;
	constructor (
		public auth: AuthService,
		public router: Router,
		public route: ActivatedRoute,
		public filmsService: FilmsService,
		public commentsService: CommentsService,
	) {

		this.comments$ = new BehaviorSubject<ICommentVM[]>( [] );

		this.film$ = this.route.paramMap.pipe(
			filter( value => value.keys.includes( 'slug' ) ),
			map( value => value.get( 'slug' ) as ID ),
			switchMap( ( filmSlug: ID ) =>
				combineLatest( [
					this.filmsService.data$.pipe( map( films => films.find( f => f.id === filmSlug ) ) ),
					this.filmsService.getCommentsByFilmId( filmSlug ),
				] ).pipe(
					map( ( [ film, comments ] ) => ( { ...film, comments } as IFilmVM ) ),
					tap( film => this.comments$?.next( film?.comments || [] ) )
				)
			)
		);

	}

	ngOnInit (): void {
	}

	public onCommentAdded = ( newComment: ICommentVM ): void => {
		const newCommentWithOwnerName = { ...newComment, ownerName: this.auth.loggedInAccount$.getValue()?.name ?? '' };
		this.comments$?.next( [ ...this.comments$.getValue(), newCommentWithOwnerName ] );
	}

}
