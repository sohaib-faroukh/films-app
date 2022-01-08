
import { Pool } from 'pg';
import { getEnvironment } from '../environments/env.util';

export type DbPool = Pool;


export class DB {
	private static readonly MAX_RETRIES = 5;
	private static instance: DbPool;
	public static initialize = async (): Promise<void> => {
		// types.setTypeParser( 1700, ( val ) => parseFloat( val ) );
		const db: DbPool = new Pool( { ...getEnvironment().postgres, application_name: 'films-app' } );

		let retries = DB.MAX_RETRIES;

		while ( retries > 0 ) {
			try {
				await db.connect();
				break;
			} catch ( error: any ) {
				retries--;
				console.log( `***** retrying to connect the database #${ this.MAX_RETRIES - retries }` );
				if ( retries === 0 ) throw error;
				await ( new Promise<void>( res => setTimeout( () => res(), 5000 ) ) );
			}
		}
		DB.instance = db;
	}


	public static getInstance = () => {
		if ( !DB.instance ) DB.initialize();
		return DB.instance;
	}
}


