import { IComment } from 'shared/models/comment';
import { IFilm } from 'shared/models/film';
import { IAccount } from '../../../shared/models/account';
import { getCurrent } from '../../../shared/utils/date.util';
import { uuid } from '../../../shared/utils/uuid.util';
import { AccountRepoFactory } from '../repositories/account.repo';
import { CommentRepoFactory } from '../repositories/comment.repo';
import { FilmRepoFactory } from '../repositories/film.repo';
import { encode } from '../utils/bcrypt.util';
import { generateAuthToken } from '../utils/jwt.util';

export class Seeder {
	private static readonly ADMIN_EMAIL = `admin@email.com`;
	private static readonly ADMIN_PASSWORD = `admin`;

	private static readonly ACCOUNTS_SIZE = 2;
	private static readonly FILMS_SIZE = 3;
	private static readonly COMMENT_SIZE_PER_FILM = 1;


	private accounts: IAccount[] = [];
	private films: IFilm[] = [];
	private comments: IComment[] = [];

	public run = async () => {
		console.log( `\n***** SEEDING DATABASE\n` );

		await CommentRepoFactory.getInstance().deleteAll();
		await FilmRepoFactory.getInstance().deleteAll();
		await AccountRepoFactory.getInstance().deleteAll();


		await this.seedAccounts();
		await this.seedFilms();
		await this.seedComments();
		console.log( `\n***** END SEEDING\n` );
	}

	private seedAccounts = async () => {
		console.log( `\n***** SEEDING account is started\n` );

		const current = getCurrent();


		// seed admin
		const adminAccount = {
			id: uuid(),
			email: Seeder.ADMIN_EMAIL,
			name: `Admin`,
			password: encode( Seeder.ADMIN_PASSWORD ),
			type: 'admin',
			status: 'active',
			createdAt: current,
		} as IAccount;
		adminAccount.token = generateAuthToken( adminAccount );

		this.accounts.push( adminAccount );
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

			this.accounts.push( account );
			await AccountRepoFactory.getInstance().add( account );
		}

		console.log( `\n***** SEEDING account is DONE\n` );

	}

	private seedFilms = async () => {

		console.log( `\n***** SEEDING films is started\n` );

		const current = getCurrent();


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
			this.films.push( item );
			await FilmRepoFactory.getInstance().add( item );
		}

		console.log( `\n***** SEEDING films is DONE\n` );


	}

	private seedComments = async () => {

		console.log( `\n***** SEEDING comments is started\n` );

		const current = getCurrent();

		const admin = this.accounts.find( e => e.email === Seeder.ADMIN_EMAIL );

		for ( const film of this.films ) {
			for ( let j = 1; j <= Seeder.COMMENT_SIZE_PER_FILM; j++ ) {
				const item: IComment = {
					id: uuid(),
					content: `comment ${ j } on ${ film.name }`,
					film: film?.id || '',
					owner: admin?.id || '',
					createdAt: current,
				} as IComment;
				this.comments.push( item );
				await CommentRepoFactory.getInstance().add( item );
			}
		}

		console.log( `\n***** SEEDING comments is DONE\n` );

	}

}


