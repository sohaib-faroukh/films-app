
import { encode } from '../../src/utils/bcrypt.util';
import { IAccount, IAccountVM } from '../../../shared/models/account';
import { IFilm } from '../../../shared/models/film';
import { getCurrent } from '../../../shared/utils/date.util';
import { uuid } from '../../../shared/utils/uuid.util';
import { IComment } from '../../../shared/models/comment';

export class TestDataGenerator {


	public static generateAccount = ( account?: Partial<IAccount> ) => {
		const id = account?.id || uuid();
		return {
			id,
			name: account?.name || `test-${ id }`,
			email: account?.email || `test-${ id }@email.com`,
			createdAt: account?.createdAt || getCurrent(),
			password: account?.password || encode( 'test' ),
			status: account?.status || 'active',
			type: account?.type || 'user',
		} as IAccountVM;
	}


	public static generateFilm = ( film?: Partial<IFilm> ) => {
		const current = getCurrent();
		const id = film?.id || uuid();
		return {
			id,
			name: film?.name || `test-${ id }`,
			description: film?.description || `test-description-${ id }`,
			genre: film?.genre || [ 'test-1', 'test-2' ],
			photo: film?.photo || '/uploaded-files/test.png',
			country: film?.country || 'SY',
			rating: film?.rating || 4,
			ticketPrice: Number( film?.ticketPrice || 12 ),
			createdAt: film?.createdAt || current,
			releaseDate: film?.releaseDate || current,
		} as IFilm;
	}

	public static generateComment = ( input?: Partial<IComment> ) => {
		const current = getCurrent();
		const id = input?.id ?? uuid();
		return {
			id,
			owner: input?.owner ?? '',
			film: input?.film ?? '',
			content: input?.content ?? `test-content-${ id }`,
			createdAt: input?.createdAt ?? current,
		} as IComment;
	}

}
