import { IComment } from '../../../shared/models/comment';
import { IFilm } from '../../../shared/models/film';
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

	constructor ( public isSeedDatabase: boolean ) { }

	public run = async () => {

		if ( this.isSeedDatabase ) {
			console.log( `\n***** SEEDING DATABASE\n` );
			await CommentRepoFactory.getInstance().deleteAll();
			await FilmRepoFactory.getInstance().deleteAll();
			await AccountRepoFactory.getInstance().deleteAll();
		}

		await this.seedAdminAccount();

		if ( this.isSeedDatabase ) {
			await this.seedAccounts();
			await this.seedFilms();
			await this.seedComments();
			console.log( `\n***** END SEEDING\n` );
		}

	}

	private seedAdminAccount = async () => {
		console.log( '***** check the admin account' );
		try {
			const foundAdminAccount = await AccountRepoFactory.getInstance().findByEmail( Seeder.ADMIN_EMAIL );
			if ( !foundAdminAccount ) throw new Error( 'not found' );
			this.accounts.push( foundAdminAccount );
			return;
		} catch ( error ) {
			console.log( '***** seed an admin account started' );
			// seed admin
			const current = getCurrent();
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
			await AccountRepoFactory.getInstance().add( adminAccount );
			this.accounts.push( adminAccount );

			console.log( '***** seed an admin is done' );

		}
		finally {
			console.log( '***** admin account checked' );
		}
	}

	private seedAccounts = async () => {
		console.log( `\n***** SEEDING account is started\n` );
		const current = getCurrent();
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
				country: `SY`,
				photo: '',
				ticketPrice: i * 100.5,
				rating: i % 6,
				genre: [ 'comedy', 'drama', 'fantasy' ],
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


