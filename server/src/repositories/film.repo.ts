import { IFilm, IFilmVM } from 'shared/models/film';
import { CrudBaseRepository } from './generics/crud-base.repo';

class FilmRepo extends CrudBaseRepository<IFilmVM, string> {

}

export class FilmRepoFactory {
	static instance: FilmRepo;

	static getInstance = (): FilmRepo => {
		if ( !FilmRepoFactory.instance ) {
			const objectColumnsMap: { [ k in keyof IFilm ]: string } = {
				id: 'id',
				name: 'name',
				createdAt: 'created_at',
				country: 'country',
				description: 'description',
				genre: 'genre', photo: 'photo',
				rating: 'rating',
				releaseDate: 'release_date',
				ticketPrice: 'ticket_price',
			};
			FilmRepoFactory.instance = new FilmRepo( '"public"."flm_films"', objectColumnsMap );
		}
		return FilmRepoFactory.instance;
	}
}

