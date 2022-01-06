import { IFilm } from 'shared/models/film';
import { IAccount } from '../../../shared/models/account';
import { getCurrent } from '../../../shared/utils/date.util';
import { uuid } from '../../../shared/utils/uuid.util';
import { AccountRepoFactory } from '../repositories/account.repo';
import { FilmRepoFactory } from '../repositories/film.repo';
import { encode } from '../utils/bcrypt.util';
import { generateAuthToken } from '../utils/jwt.util';

export class Seeder {
	private static readonly ACCOUNTS_SIZE = 2;
	private static readonly FILMS_SIZE = 3;

	public static run = async () => {
		console.log( `\n***** SEEDING DATABASE\n` );
		await Seeder.seedAccounts();
		await Seeder.seedFilms();
		console.log( `\n***** END SEEDING\n` );
	}

	private static seedAccounts = async () => {
		console.log( `\n***** SEEDING account is started\n` );

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

		console.log( `\n***** SEEDING account is DONE\n` );

	}

	private static seedFilms = async () => {

		console.log( `\n***** SEEDING films is started\n` );

		const current = getCurrent();

		await FilmRepoFactory.getInstance().deleteAll();
		const films = [];

		for ( let i = 1; i <= Seeder.FILMS_SIZE; i++ ) {
			const item: IFilm = {
				id: uuid(),
				name: `film ${ i }`,
				description: `film ${ i } description, and it should be a long string`,
				country: `country-${ i }`,
				photo: '',
				ticketPrice: i * 100.5,
				rating: i % 6,
				genre: [ `${ i % 5 }`, `${ ( i + 1 ) % 5 }` ],
				releaseDate: current,

				createdAt: current,
			} as IFilm;
			films.push( item );
			await FilmRepoFactory.getInstance().add( item );
		}

		console.log( `\n***** SEEDING films is DONE\n` );

	}

}


