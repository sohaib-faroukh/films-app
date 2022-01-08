import { IComment, ICommentVM } from 'shared/models/comment';
import { ID } from 'shared/models/generics/id';
import { AccountRepoFactory } from './account.repo';
import { FilmRepoFactory } from './film.repo';
import { CrudBaseRepository, QueryOptions } from './generics/crud-base.repo';

class CommentRepo extends CrudBaseRepository<ICommentVM, string> {

	public findFully = async ( options?: QueryOptions ): Promise<ICommentVM[]> => {
		const normalizedOptions = this.normalizeQueryOptions( options );

		const queryText = `
			select *, acc.name as "ownerName", flm.name as "filmName" from ${ this.resourceName } cmt
			left join ${ AccountRepoFactory.resourceName } acc on acc.id = cmt.owner
			left join ${ FilmRepoFactory.resourceName } flm on flm.id = cmt.film
			${ normalizedOptions.whereClause } ${ normalizedOptions.sortByClause } ;
		`;

		const result = ( ( await this.query( queryText, normalizedOptions.queryValues || [] ) ).rows || [] ).map( e => this.entityToObject( e ) as ICommentVM );

		return result;
	}

	public findByIdFully = async ( id: ID ): Promise<ICommentVM | null> => {
		const result = await this.findById( id );
		if ( result !== null ) {
			result.ownerName = ( await AccountRepoFactory.getInstance().findById( result?.owner ) )?.name || '';
			result.filmName = ( await FilmRepoFactory.getInstance().findById( result?.film ) )?.name || '';
		}
		return result;
	}

	public findByFilmId = async ( filmId: ID ): Promise<ICommentVM[]> => {
		const result = await this.findFully( { whereClause: 'where film = $1', queryValues: [ filmId ] } ) || [];
		return result;
	}
}

export class CommentRepoFactory {
	static instance: CommentRepo;
	static readonly resourceName = '"public"."flm_comments"';
	static getInstance = (): CommentRepo => {
		if ( !CommentRepoFactory.instance ) {
			const objectColumnsMap: [ keyof IComment, string ][] = [
				[ 'id', 'id' ],
				[ 'createdAt', 'created_at' ],
				[ 'film', 'film' ],
				[ 'owner', 'owner' ],
				[ 'content', 'content' ],
			];
			CommentRepoFactory.instance = new CommentRepo( CommentRepoFactory.resourceName, objectColumnsMap );
		}
		return CommentRepoFactory.instance;
	}
}

