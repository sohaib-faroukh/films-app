import * as express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import * as logger from 'morgan';
import { AccountController } from './controllers/account.controller';
import { Seeder } from './db/seed.db';
import { getEnvironment } from './environments/env.util';
import { cors } from './middlewares/cors.middleware';
import { requestResponder } from './middlewares/request-responder.middleware';



const env = process.argv?.includes( '--production' ) ? getEnvironment( 'prod' ) : getEnvironment();
const ANGULAR_DIST_FILES = env?.ANGULAR_DIST_FILES;
const PORT = env.PORT || 3005;
const PREFIX = '/v1/api';


const apiRoutes: Router = Router();


// Routes do not need authorization

//  Login & sign-up endpoints
apiRoutes.route( PREFIX + '/auth/sign-up' ).post( AccountController.postAccount );
apiRoutes.route( PREFIX + '/auth/login' ).post( AccountController.postLoginAccount );



// Routes needs authorization

// Conversations endpoints
// apiRoutes.route( PREFIX + '/conversations' ).get( authorize, getConversationByAccount );


// Messages endpoints
// apiRoutes.route( PREFIX + '/messages' ).get( authorize, getMessagesByConversation );



// Static files routes - don not needs authorization
//  Frontend application files -static files-
apiRoutes.route( '/*' ).get( ( req: Request, res: Response ) =>
	res.sendFile( ANGULAR_DIST_FILES.rootFile, { root: ANGULAR_DIST_FILES.path } )
);




// Bootstrapping the application
const expressApp = express();

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
	expressApp.listen( PORT, async () => {
		console.log( `\n***** THE APP IS RUNNING ON PORT #${ PORT } *****\n` );

		await Seeder.run();
	} );
};


