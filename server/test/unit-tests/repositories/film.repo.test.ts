import 'jest';
import { uuid } from '../../../../shared/utils/uuid.util';
import { DB } from '../../../src/db/db';
import { FilmRepoFactory } from '../../../src/repositories/film.repo';
import { TestDataGenerator } from '../../../test/helpers/test-data-generator';


describe( 'film.repo testing', () => {


	beforeAll( async () => {
		await DB.initialize();
	} );

	it( 'not.toBeUndefined', () => {
		const instance = FilmRepoFactory.getInstance();
		expect( instance as any ).not.toBeUndefined();
	} );



	it( 'should add a film', async () => {
		const id = uuid();
		const object = TestDataGenerator.generateFilm( { id } );
		await FilmRepoFactory.getInstance().add( object );
		const added = await FilmRepoFactory.getInstance().findById( id );
		expect( added ).toEqual( object );
	} );


	it( 'should find film by id', async () => {
		const id = uuid();
		const film = TestDataGenerator.generateFilm( { id } );

		// add new one
		await FilmRepoFactory.getInstance().add( film );

		// query the film by id, it should not be exist
		const found = await FilmRepoFactory.getInstance().findById( id );
		expect( found ).toEqual( film );


	} );


	it( 'should remove a film', async () => {
		const id = uuid();
		const film = TestDataGenerator.generateFilm( { id } );


		// add new one
		await FilmRepoFactory.getInstance().add( film );

		// delete the added one
		await FilmRepoFactory.getInstance().delete( id );

		// query the film by id, it should not be exist
		const found = await FilmRepoFactory.getInstance().findById( id );
		expect( found ).toBeNull();


	} );

} );
