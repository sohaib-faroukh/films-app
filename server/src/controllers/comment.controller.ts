import { NextFunction, Request, RequestHandler, Response } from 'express';
import { body, param } from 'express-validator';
import { IComment, ICommentVM } from 'shared/models/comment';
import { ID } from 'shared/models/generics/id';
import { getCurrent, isDateValid } from '../../../shared/utils/date.util';
import { uuid } from '../../../shared/utils/uuid.util';
import { requestResponder } from '../middlewares/request-responder.middleware';
import { requestValidator } from '../middlewares/request-validator.middleware';
import { AccountRepoFactory } from '../repositories/account.repo';
import { CommentRepoFactory } from '../repositories/comment.repo';
import { FilmRepoFactory } from '../repositories/film.repo';





/**
 * class have functionalities of Accounts operations
 */
export class CommentController {


	/**
	 * sign up new account - add new account
	 */
	public static get: RequestHandler[] = [
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {
			const result = ( await CommentRepoFactory.getInstance().find() ) || [];
			return result;
		} ),
	];

	public static getById: RequestHandler[] = [
		param( 'id' ).exists().bail().isString(),
		requestValidator,
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

			const { id } = req?.params;

			const result: ICommentVM = await CommentController.findById( id );

			return result;
		} ),
	];


	/**
	 * create new film api
	 */
	public static post: RequestHandler[] = [
		body( 'content' ).exists().bail().isString(),
		body( 'film' ).exists().bail().isString(),
		body( 'owner' ).exists().bail().isString(),
		requestValidator,
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

			const payload = req?.body as IComment;
			if ( !FilmRepoFactory.getInstance().findById( payload.film ) ) {
				throw new Error( 'error: specified film is not found' );
			}
			if ( !AccountRepoFactory.getInstance().findById( payload.owner ) ) {
				throw new Error( 'error: specified comment owner is not found' );
			}

			const current = getCurrent();
			payload.createdAt = current;
			payload.id = uuid();
			const newEntity: IComment = payload as IComment;
			const result = ( await CommentRepoFactory.getInstance().add( newEntity ) ) || null;
			return result;

		} ),
	];


	public static delete: RequestHandler[] = [
		param( 'id' ).exists().bail().isString(),
		requestValidator,
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

			const { id } = req?.params;
			const result: ICommentVM = await CommentController.findById( id );
			await CommentRepoFactory.getInstance().delete( id );
			return result;

		} ),
	];


	private static findById = async ( id: ID ) => {
		return ( await CommentRepoFactory.getInstance().findByIdFully( id )
			.then( data => {
				if ( !data ) throw new Error( 'not found' );
				return data;
			} )
			.catch( error => {
				throw new Error( 'error while finding comment by id, id: ' + id );
			} ) );

	}


}
