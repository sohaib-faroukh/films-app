
import 'jest';
import { uuid } from '../../../../shared/utils/uuid.util';
import { DB } from '../../../src/db/db';
import { AccountRepoFactory } from '../../../src/repositories/account.repo';
import { TestDataGenerator } from '../../../test/helpers/test-data-generator';


describe( 'account.repo testing', () => {

	beforeAll( async () => {
		await DB.initialize();
	} );


	it( 'not.toBeUndefined', () => {
		const instance = AccountRepoFactory.getInstance();
		expect( instance as any ).not.toBeUndefined();
	} );



	it( 'should add account', async () => {
		const id = uuid();
		const account = TestDataGenerator.generateAccount( { id } );
		await AccountRepoFactory.getInstance().add( account );
		const addedAccount = await AccountRepoFactory.getInstance().findById( id );
		expect( addedAccount ).toEqual( account );
	} );


	it( 'should add remove account', async () => {
		const id = uuid();
		const account = TestDataGenerator.generateAccount( { id } );

		// add new one
		await AccountRepoFactory.getInstance().add( account );

		// delete the added one
		await AccountRepoFactory.getInstance().delete( id );

		// query the account by id, it should not be exist
		const found = await AccountRepoFactory.getInstance().findById( id );
		expect( found ).toBeNull();


	} );

	it( 'should find by email', async () => {
		const id = uuid();
		const account = TestDataGenerator.generateAccount( { id } );

		// add new one
		await AccountRepoFactory.getInstance().add( account );

		// find by email
		const found = await AccountRepoFactory.getInstance().findByEmail( account.email ?? '' );
		expect( found ).toEqual( account );

	} );

} );
