import { NextFunction, Request, RequestHandler, Response } from 'express';
import { body, param } from 'express-validator';
import { IFilm, IFilmVM } from 'shared/models/film';
import { ID } from 'shared/models/generics/id';
import { getCurrent, isDateValid } from '../../../shared/utils/date.util';
import { uuid } from '../../../shared/utils/uuid.util';
import { requestResponder } from '../middlewares/request-responder.middleware';
import { requestValidator } from '../middlewares/request-validator.middleware';
import { FilmRepoFactory } from '../repositories/film.repo';




/**
 * class have functionalities of Accounts operations
 */
export class FilmController {


	/**
	 * sign up new account - add new account
	 */
	public static get: RequestHandler[] = [
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {
			const result = ( await FilmRepoFactory.getInstance().find() ) || [];
			return result;
		} ),
	];

	public static getById: RequestHandler[] = [
		param( 'id' ).exists().bail().isString(),
		requestValidator,
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

			const { id } = req?.params;

			const result: IFilmVM = await FilmController.findById( id );

			return result;
		} ),
	];


	/**
	 * create new film api
	 */
	public static post: RequestHandler[] = [
		body( 'name' ).exists().bail().isString(),
		body( 'description' ).optional().isString(),
		body( 'rating' ).optional().isNumeric().bail().custom( v => v <= 5 && v >= 0 ),
		body( 'releaseDate' ).optional().custom( v => isDateValid( v ) ),
		body( 'ticketPrice' ).optional().isNumeric().bail().custom( v => v > 0 ),
		body( 'genre' ).exists().bail().isArray(),
		requestValidator,
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

			const payload = req?.body as Partial<IFilm>;
			const current = getCurrent();
			payload.createdAt = current;
			payload.id = uuid();
			const newEntity: IFilm = payload as IFilm;
			const result = ( await FilmRepoFactory.getInstance().add( newEntity ) ) || null;
			return result;

		} ),
	];


	public static delete: RequestHandler[] = [
		param( 'id' ).exists().bail().isString(),
		requestValidator,
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

			const { id } = req?.params;
			const result: IFilmVM = await FilmController.findById( id );
			await FilmRepoFactory.getInstance().delete( id );
			return result;

		} ),
	];


	private static findById = async ( id: ID ) => {
		return ( await FilmRepoFactory.getInstance().findOne( { whereClause: 'where id = $1', queryValues: [ id ] } )
			.then( data => {
				if ( !data ) throw new Error( 'not found' );
				return data;
			} )
			.catch( error => {
				throw new Error( 'error while finding film by id, id: ' + id );
			} ) );

	}


}
