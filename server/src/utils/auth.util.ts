import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AccountType, IAccount } from '../../../shared/models/account';
import { AccountRepoFactory } from '../repositories/account.repo';
import { verifyAuthToken } from './jwt.util';


const verifyAccountByToken = async ( authorizationToken: string ): Promise<IAccount> => {
	const token = getToken( authorizationToken );
	const decodedAccount = verifyAuthToken( token ) as IAccount;
	if ( !decodedAccount?.email ) throw new Error( '2. Not authorized' );
	const foundAccount = await AccountRepoFactory.getInstance().findByEmail( decodedAccount?.email || '' );
	if ( !foundAccount ) throw new Error( '3. Not authorized' );
	return foundAccount;

};


export const getToken = ( param: string ): string => {
	const token = param?.trim()?.includes( ' ' ) ? param?.trim()?.split( ' ' )[ 1 ] : param?.trim();
	return token;
};

export const authorizeByRoles = ( types: AccountType[] ) => async ( req: Request, res: Response, next: NextFunction ) => {
	try {
		console.log( '**** authorize: ', req.url );
		if ( !req?.headers?.authorization ) throw new Error( '1. Not authorized' );
		const foundAccount = await verifyAccountByToken( req?.headers?.authorization );
		if ( !foundAccount.type || !types.includes( foundAccount.type ) ) throw new Error( '4. Not authorized - access denied' );
		return next();

	} catch ( error: any ) {
		console.error( '**** ERROR: ', error );
		return res.status( StatusCodes.UNAUTHORIZED ).json( {
			code: StatusCodes.UNAUTHORIZED,
			error: 'UNAUTHORIZED',
			message: '',
			data: null,
		} );
	}


};

export const authorize = async ( req: Request, res: Response, next: NextFunction ) => {
	try {
		if ( !req?.headers?.authorization ) throw new Error( '1. Not authorized' );
		const foundAccount = await verifyAccountByToken( req?.headers?.authorization );
		return next();

	} catch ( error: any ) {
		console.error( '**** ERROR: ', error );
		return res.status( StatusCodes.UNAUTHORIZED ).json( {
			code: StatusCodes.UNAUTHORIZED,
			error: 'UNAUTHORIZED',
			message: '',
			data: null,
		} );
	}


};
