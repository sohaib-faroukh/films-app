import { IAccount } from '../../../shared/models/account';
import { getCurrent } from '../../../shared/utils/date.util';
import { uuid } from '../../../shared/utils/uuid.util';
import { AccountRepoFactory } from '../repositories/account.repo';
import { encode } from '../utils/bcrypt.util';
import { generateAuthToken } from '../utils/jwt.util';

export class Seeder {
	private static readonly ACCOUNTS_SIZE = 2;

	public static run = async () => {
		console.log( `\n***** SEEDING DATABASE\n` );
		await Seeder.seedAccounts();
		console.log( `\n***** END SEEDING\n` );
	}

	private static seedAccounts = async () => {
		const current = getCurrent();

		await AccountRepoFactory.getInstance().deleteAll();

		// seed admin
		const adminAccount = {
			id: uuid(),
			email: `admin@email.com`,
			name: `Admin`,
			password: encode( `admin` ),
			type: 'admin',
			status: 'active',
			createdAt: current,
		} as IAccount;
		adminAccount.token = generateAuthToken( adminAccount );
		await AccountRepoFactory.getInstance().add( adminAccount );

		// seed normal users


		for ( let i = 1; i <= Seeder.ACCOUNTS_SIZE; i++ ) {
			const account = {
				id: uuid(),
				email: `user-${ i }@email.com`,
				name: `user ${ i }`,
				password: encode( `user-${ i }@email.com` ),
				type: 'user',
				status: 'active',
				createdAt: current,
			} as IAccount;
			account.token = generateAuthToken( account );
			await AccountRepoFactory.getInstance().add( account );
		}
	}

}


