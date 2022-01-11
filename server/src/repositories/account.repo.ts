import { IAccount, IAccountVM } from '../../../shared/models/account';
import { getToken } from '../utils/auth.util';
import { verifyAuthToken } from '../utils/jwt.util';
import { CrudBaseRepository } from './generics/crud-base.repo';

export class AccountRepo extends CrudBaseRepository<IAccountVM, string> {


	public findByEmail = async ( email: string ): Promise<IAccount> => {
		const account = ( await this.findOne(
			{ whereClause: 'where email=$1', queryValues: [ email ] }
		) ) as IAccount | null;
		if ( !account ) throw new Error( 'email is not found' );
		return account;
	}



	/**
	 * retrieve the logged in account by token
	 * @param token user token
	 * @returns account of the passed token
	 */
	public getLoggedInAccount = async ( token: string | undefined ): Promise<IAccount | null> => {
		if ( !token ) return null;
		token = getToken( token );
		const account = verifyAuthToken( token );
		if ( account ) {
			return await this.findByEmail( account.email || '' );
		}
		else return null;
	}


}

export class AccountRepoFactory {
	static instance: AccountRepo;
	static readonly resourceName = '"public"."flm_accounts"';

	static getInstance = (): AccountRepo => {
		if ( !AccountRepoFactory.instance ) {
			const objectColumnsMap: [ keyof IAccount, string ][] = [
				[ 'id', 'id' ],
				[ 'name', 'name' ],
				[ 'createdAt', 'created_at' ],
				[ 'password', 'password' ],
				[ 'email', 'email' ],
				[ 'token', 'token' ],
				[ 'type', 'type' ],
				[ 'status', 'status' ],
			];
			AccountRepoFactory.instance = new AccountRepo( AccountRepoFactory.resourceName, objectColumnsMap );
		}
		return AccountRepoFactory.instance;
	}
}

