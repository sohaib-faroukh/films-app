import { IMap } from 'shared/models/generics/map';
import { ID } from '../../../../shared/models/generics/id';
import { DB } from '../../db/db';


export type QueryOptions = { whereClause?: string, sortByClause?: string, queryValues?: any[] };

export abstract class CrudBaseRepository<T, IdType extends ID> {


	private columnKeysMap: IMap<string> = {};

	constructor ( public resourceName: string, columnKeysMap?: { [ key in keyof T ]: string } ) {
		this.columnKeysMap = columnKeysMap || {};
	}

	private normalizeQueryOptions = ( options?: QueryOptions ): QueryOptions => {
		return {
			queryValues: [ ...( options || {} )?.queryValues || [] ],
			sortByClause: ( options || {} )?.sortByClause || '',
			whereClause: ( options || {} )?.whereClause || '',
		} as QueryOptions;
	}

	private entityToObject = ( item: any ): T => {
		const result: any = {};
		Object.keys( this.columnKeysMap ).forEach( ( k: string ) => {
			if ( item[ this.columnKeysMap[ k ] ] ) {
				result[ k ] = item[ this.columnKeysMap[ k ] ];
			}
		} );
		return ( result as T );
	}

	public find = async ( options?: QueryOptions ): Promise<T[]> => {
		const normalizedOptions = this.normalizeQueryOptions( options );
		const queryString = `select * from ${ this.resourceName } ${ normalizedOptions.whereClause } ${ normalizedOptions.sortByClause } ;`;

		return ( await DB.getInstance().query( queryString, normalizedOptions.queryValues || [] ) ).rows.map( e => this.entityToObject( e ) ) || [] as T[];
	}

	public findById = async ( id: ID ): Promise<T | null> => {
		const queryString = `select * from ${ this.resourceName } where id = $1 limit 1;`;
		const entity = ( await DB.getInstance().query( queryString, [ id ] ) ).rows[ 0 ] || null;
		return entity ? this.entityToObject( entity ) : null;
	}


	public findOne = async ( options?: QueryOptions ): Promise<T> => {
		const normalizedOptions = this.normalizeQueryOptions( options );
		const queryString = `select * from ${ this.resourceName } ${ normalizedOptions.whereClause } ${ normalizedOptions.sortByClause } limit 1;`;
		const entity = ( await DB.getInstance().query( queryString, normalizedOptions.queryValues || [] ) ).rows[ 0 ];
		return this.entityToObject( entity );
	}


	public add = async ( entity: T ): Promise<T> => {

		const columns: any[] = [];
		const values: string[] = [];


		for ( const key in entity ) {
			if ( entity[ key ] && this.columnKeysMap[ key ] ) {
				columns.push( this.columnKeysMap[ key ] );
				values.push( entity[ key ] as any );
			}
		}

		const queryIndicatorOfValues = values.map( ( _, ix ) => `$${ ix + 1 }` );

		const queryString = `
		INSERT INTO ${ this.resourceName }
					( ${ columns.join( ', ' ) }  )
		VALUES 	( ${ queryIndicatorOfValues.join( ', ' ) }  );
			`;

		await DB.getInstance().query( queryString, values );

		return entity;
	}


	public delete = async ( id: IdType ): Promise<T> => {
		return this.findOne( { whereClause: 'where id=$1', queryValues: [ id ] } ).then( async item => {
			const queryString = `delete from ${ this.resourceName } where id = $1`;
			await DB.getInstance().query( queryString, [ id ] );
			return item;
		} ).catch( error => {
			console.error( 'DB ERROR - DELETE ERROR ID: ', this.resourceName, ' - ', id, ' ERROR: ', error );
			throw error;
		} );
	}


	public deleteAll = async (): Promise<void> => {
		const queryString = `delete from ${ this.resourceName } where 1 = 1;`;
		await DB.getInstance().query( queryString );
	}


	public query = async ( text: string, values?: any[] ): Promise<unknown> => {
		return await DB.getInstance().query( text, values );
	}


}
