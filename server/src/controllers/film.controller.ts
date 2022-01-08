import { NextFunction, Request, RequestHandler, Response } from 'express';
import { body, param } from 'express-validator';
import { ICommentVM } from '../../../shared/models/comment';
import { IFilm, IFilmVM } from '../../../shared/models/film';
import { ID } from '../../../shared/models/generics/id';
import { arrayToMap } from '../../../shared/utils/map.util';
import { getCurrent, isDateValid } from '../../../shared/utils/date.util';
import { uuid } from '../../../shared/utils/uuid.util';
import { requestResponder } from '../middlewares/request-responder.middleware';
import { requestValidator } from '../middlewares/request-validator.middleware';
import { AccountRepoFactory } from '../repositories/account.repo';
import { CommentRepoFactory } from '../repositories/comment.repo';
import { FilmRepoFactory } from '../repositories/film.repo';
import { fileUploader, FileUploaderFieldName } from '../utils/file-uploader.util';



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


	/**
	 * get film by id with its details (e.g. comments ) api
	 */
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

	/**
	 * delete a film by its ID api
	 */
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

	/**
	 * get all comments related to a film by its ID api
	 */
	public static getCommentsByFilmId: RequestHandler[] = [
		param( 'id' ).exists().bail().isString(),
		requestValidator,
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

			const { id } = req?.params;
			if ( !id ) throw new Error( 'film id is not provided with the request' );

			const film = await FilmRepoFactory.getInstance().findById( id );
			if ( !film ) throw new Error( 'error - film is not found' );

			const accounts = arrayToMap( ( await AccountRepoFactory.getInstance().find() ) ?? [] ) ?? {};

			const result: ICommentVM[] = ( await CommentRepoFactory.getInstance().findByFilmId( id ) ?? [] )
				.map( comment => ( {
					...comment,
					ownerName: accounts[ comment.owner ]?.name ?? '',
					filmName: film?.name ?? '',
				} as ICommentVM ) );
			return result;

		} ),
	];

	/**
	 * upload image for the film
	 */
	public static uploadFilmImage: RequestHandler[] = [
		fileUploader.single( FileUploaderFieldName ),
		param( 'film' ).exists().bail().isString(),
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

			if ( !req.file ) throw new Error( 'error - no file is provided' );
			const myFile = req.file;

			const { film } = req.params;
			if ( !film ) throw new Error( 'error - film id is not provided' );

			if ( !FilmController.isFileImage( myFile?.mimetype ) ) throw new Error( 'error - uploaded file is not an image type file' );

			const path = myFile?.path || '';
			await FilmRepoFactory.getInstance().query( `update "public"."flm_films" set photo = $1 where id = $2`, [ path, film ] ).catch( error => {
				console.error( error );
				throw new Error( `error - an issue happened while setting the film image, film id: ${ film }` );
			} );

			const result = FilmRepoFactory.getInstance().findById( film );
			return result;
		} ),

	];


	private static findById = async ( id: ID ) => {
		return ( await FilmRepoFactory.getInstance().findByIdFully( id )
			.then( data => {
				if ( !data ) throw new Error( 'not found' );
				return data;
			} )
			.catch( error => {
				throw new Error( 'error while finding film by id, id: ' + id );
			} ) );

	}


	private static isFileImage = ( mimeType: string ): boolean => {
		return ( mimeType.split( '/' )[ 0 ] === 'image' );

	}




}
