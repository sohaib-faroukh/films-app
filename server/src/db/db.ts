
import { Pool } from 'pg';
import { getEnvironment } from '../environments/env.util';

export type DbPool = Pool;


export class DB {
	private static instance: DbPool;
	private static initialize = () => {
		// types.setTypeParser( 1700, ( val ) => parseFloat( val ) );
		const db: DbPool = new Pool( { ...getEnvironment().postgres, application_name: 'films-app' } );
		return db;
	}


	public static getInstance = () => {
		if ( !DB.instance ) DB.instance = DB.initialize();
		return DB.instance;
	}
}


