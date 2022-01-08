import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import * as logger from 'morgan';
import { AccountController } from './controllers/account.controller';
import { CommentController } from './controllers/comment.controller';
import { FilmController } from './controllers/film.controller';
import { DB } from './db/db';
import { Seeder } from './db/seed.db';
import { getEnvironment } from './environments/env.util';
import { cors } from './middlewares/cors.middleware';
import { requestResponder } from './middlewares/request-responder.middleware';



const env = process.argv?.includes( '--production' ) ? getEnvironment( 'prod' ) : getEnvironment();
const ANGULAR_DIST_FILES = env?.ANGULAR_DIST_FILES;
const StoragePath = env?.storageBucket;
const PORT = env.PORT || 3005;
const PREFIX = '/v1/api';


const apiRoutes: Router = Router();


// Routes do not need authorization

//  Login & sign-up endpoints
apiRoutes.route( PREFIX + '/auth/sign-up' ).post( AccountController.postAccount );
apiRoutes.route( PREFIX + '/auth/login' ).post( AccountController.postLoginAccount );

// Films endpoints
apiRoutes.route( PREFIX + '/films/:id/comments' ).get( FilmController.getCommentsByFilmId );
apiRoutes.route( PREFIX + '/films/:film/upload-image' ).post( FilmController.uploadFilmImage );
apiRoutes.route( PREFIX + '/films/:id' ).get( FilmController.getById ).delete( FilmController.delete );
apiRoutes.route( PREFIX + '/films' ).get( FilmController.get ).post( FilmController.post );


// comments endpoints
apiRoutes.route( PREFIX + '/comments' ).get( CommentController.get ).post( CommentController.post );
apiRoutes.route( PREFIX + '/comments/:id' ).get( CommentController.getById ).delete( CommentController.delete );




// Static files routes - don not needs authorization
//  Frontend application files -static files-
apiRoutes.route( '/*' ).get( ( req: Request, res: Response ) =>
	res.sendFile( ANGULAR_DIST_FILES.rootFile, { root: ANGULAR_DIST_FILES.path } )
);





// Bootstrapping the application
const expressApp = express();

expressApp.use( `/${ StoragePath }`, express.static( StoragePath ) );
expressApp.use( express.static( ANGULAR_DIST_FILES.path ) );
expressApp.use( express.json() );
expressApp.use( express.urlencoded( { limit: '200mb', extended: true } ) );

expressApp.use( cors );
expressApp.use( logger( 'short' ) );
expressApp.use( apiRoutes );

expressApp.use( '', requestResponder( ( req: Request, res: Response, next: NextFunction ) => {
	throw new Error( 'Route is not implemented' );
} ) );


export const bootstrapTheApp = async () => {

	await DB.initialize().then( () =>
		expressApp.listen( PORT, async () => {
			console.log( `\n***** THE APP IS RUNNING ON PORT #${ PORT } *****\n` );
			// await ( new Seeder() ).run();
		} ) );
};


