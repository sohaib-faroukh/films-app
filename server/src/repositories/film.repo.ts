import { IFilm, IFilmVM } from 'shared/models/film';
import { ID } from 'shared/models/generics/id';
import { CommentRepoFactory } from './comment.repo';
import { CrudBaseRepository } from './generics/crud-base.repo';

class FilmRepo extends CrudBaseRepository<IFilmVM, string> {
	public findByIdFully = async ( id: ID ): Promise<IFilmVM | null> => {
		const result = await this.findById( id );
		if ( result !== null ) {
			result.comments = ( await CommentRepoFactory.getInstance().findByFilmId( id ) ) || [];
		}
		return result;
	}

}

export class FilmRepoFactory {
	static instance: FilmRepo;
	static readonly resourceName = '"public"."flm_films"';

	static getInstance = (): FilmRepo => {
		if ( !FilmRepoFactory.instance ) {
			const objectColumnsMap: [ keyof IFilm, string ][] = [
				[ 'id', 'id' ],
				[ 'name', 'name' ],
				[ 'createdAt', 'created_at' ],
				[ 'country', 'country' ],
				[ 'description', 'description' ],
				[ 'genre', 'genre' ],
				[ 'photo', 'photo' ],
				[ 'rating', 'rating' ],
				[ 'releaseDate', 'release_date' ],
				[ 'ticketPrice', 'ticket_price' ],
			];
			FilmRepoFactory.instance = new FilmRepo( FilmRepoFactory.resourceName, objectColumnsMap );
		}
		return FilmRepoFactory.instance;
	}
}

