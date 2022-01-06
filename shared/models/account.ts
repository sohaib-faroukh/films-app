import { ID } from './generics/id';

export type AccountType = 'user' | 'admin' | 'agent';

export interface IAccount {
	id?: ID;
	name?: string;
	email?: string;
	password?: string;
	status?: 'active' | 'busy' | 'inactive';
	type?: AccountType;
	token?: string;
	createdAt?: string;
}


export interface IRemovable {
	isRemovable?: boolean;
}
export interface IAccountVM extends IAccount, IRemovable { }


