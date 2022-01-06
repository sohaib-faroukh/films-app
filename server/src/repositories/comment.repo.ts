import { IComment, ICommentVM } from 'shared/models/comment';
import { ID } from 'shared/models/generics/id';
import { AccountRepoFactory } from './account.repo';
import { FilmRepoFactory } from './film.repo';
import { CrudBaseRepository } from './generics/crud-base.repo';

class CommentRepo extends CrudBaseRepository<ICommentVM, string> {
	public findByIdFully = async ( id: ID ): Promise<ICommentVM | null> => {
		const result = await this.findById( id );
		if ( result !== null ) {
			result.ownerName = ( await AccountRepoFactory.getInstance().findById( result?.owner ) )?.name || '';
			result.filmName = ( await FilmRepoFactory.getInstance().findById( result?.film ) )?.name || '';
		}
		return result;
	}

	public findByFilmId = async ( filmId: ID ): Promise<ICommentVM[]> => {
		const result = await this.find( { whereClause: 'where film = $1', queryValues: [ filmId ] } ) || [];
		return result;
	}
}

export class CommentRepoFactory {
	static instance: CommentRepo;

	static getInstance = (): CommentRepo => {
		if ( !CommentRepoFactory.instance ) {
			const objectColumnsMap: { [ k in keyof IComment ]: string } = {
				id: 'id',
				createdAt: 'created_at',
				film: 'film',
				owner: 'owner',
				content: 'content',
			};
			CommentRepoFactory.instance = new CommentRepo( '"public"."flm_comments"', objectColumnsMap );
		}
		return CommentRepoFactory.instance;
	}
}

