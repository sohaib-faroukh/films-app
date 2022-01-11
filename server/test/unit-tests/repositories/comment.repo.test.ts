import 'jest';
import { uuid } from '../../../../shared/utils/uuid.util';
import { DB } from '../../../src/db/db';
import { AccountRepoFactory } from '../../../src/repositories/account.repo';
import { CommentRepoFactory } from '../../../src/repositories/comment.repo';
import { FilmRepoFactory } from '../../../src/repositories/film.repo';
import { TestDataGenerator } from '../../../test/helpers/test-data-generator';




describe( 'comment.repo testing', () => {

	const addComment = async () => {
		const id = uuid();
		const testFilm = TestDataGenerator.generateAccount();
		await FilmRepoFactory.getInstance().add( testFilm );

		const testAccount = TestDataGenerator.generateAccount();
		await AccountRepoFactory.getInstance().add( testAccount );

		const object = TestDataGenerator.generateComment( { id, film: testFilm.id, owner: testAccount.id } );

		await CommentRepoFactory.getInstance().add( object );
		return object;
	};


	beforeAll( async () => {
		await DB.initialize();
	} );

	it( 'not.toBeUndefined', () => {
		const instance = CommentRepoFactory.getInstance();
		expect( instance as any ).not.toBeUndefined();
	} );



	it( 'should add a comment', async () => {
		const object = await addComment();
		const added = await CommentRepoFactory.getInstance().findById( object.id || '' );
		expect( added ).toEqual( object );
	} );


	it( 'should find comment by id', async () => {

		const object = await addComment();

		// query the account by id, it should not be exist
		const found = await CommentRepoFactory.getInstance().findById( object.id || '' );
		expect( found ).toEqual( object );


	} );


	it( 'should remove a comment', async () => {
		const object = await addComment();

		// delete the added one
		await CommentRepoFactory.getInstance().delete( String( object.id || '' ) );

		// query the comment by id, it should not be exist
		const found = await CommentRepoFactory.getInstance().findById( object.id || '' );
		expect( found ).toBeNull();


	} );

} );
