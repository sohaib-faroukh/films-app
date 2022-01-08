import { NextFunction, Request, RequestHandler, Response } from 'express';
import { body } from 'express-validator';
import { IAccount } from '../../../shared/models/account';
import { getCurrent } from '../../../shared/utils/date.util';
import { uuid } from '../../../shared/utils/uuid.util';
import { requestResponder } from '../middlewares/request-responder.middleware';
import { requestValidator } from '../middlewares/request-validator.middleware';
import { AccountRepoFactory } from '../repositories/account.repo';
import { compare, encode } from '../utils/bcrypt.util';
import { generateAuthToken } from '../utils/jwt.util';


/**
 * class have functionalities of Accounts operations
 */
export class AccountController {

	/**
	 * express.js handler that return all the accounts in the DB
	 */
	public static getAccounts: RequestHandler[] = [
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {
			const repo = await AccountRepoFactory.getInstance().find();
			const accounts: IAccount[] = repo || [];
			return accounts;
		} ),
	];


	/**
	 * sign up new account - add new account
	 */
	public static postAccount: RequestHandler[] = [
		body( 'email' ).exists().isEmail(),
		body( 'name' ).optional().isString(),
		body( 'password' ).exists().isString(),
		requestValidator,
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {

			const payload = req?.body as Partial<IAccount>;
			const current = getCurrent();
			payload.createdAt = current;
			payload.type ||= 'user';
			payload.id = uuid();
			if ( !payload?.password ) throw new Error( 'no password is provided' );
			payload.password = encode( payload.password );
			const newAccount: IAccount = payload as IAccount;
			newAccount.token = generateAuthToken( newAccount );
			const result = ( await AccountRepoFactory.getInstance().add( newAccount ) ) || null;
			return AccountController.secure( result );

		} ),

	];


	/**
	 * login account - find and return the account with its token by its email and password
	 */
	public static postLoginAccount: RequestHandler[] = [
		body( 'email' ).exists().isEmail(),
		body( 'password' ).exists().isString(),
		requestValidator,
		requestResponder( async ( req: Request, res: Response, next: NextFunction ) => {
			const { email, password } = req?.body as Pick<IAccount, 'email' | 'password'>;
			const account = await AccountRepoFactory.getInstance().findByEmail( email || '' );
			if ( !account?.password ) throw new Error( 'no password attached with the account' );
			const isPasswordMatch = compare( password || '', account?.password );
			if ( !isPasswordMatch ) throw new Error( 'wrong password' );
			return AccountController.secure( account );
		} ),

	];


	private static secure = ( input: any ): any => {
		const result: any = { ...input };
		if ( 'password' in result ) delete result.password;
		return result;
	}


}
