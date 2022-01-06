import { IBaseModel } from './generics/base-model';

export type AccountType = 'user' | 'admin' | 'agent';

export interface IAccount extends IBaseModel {
	name?: string;
	email?: string;
	password?: string;
	status?: 'active' | 'busy' | 'inactive';
	type?: AccountType;
	token?: string;
}


export interface IRemovable {
	isRemovable?: boolean;
}
export interface IAccountVM extends IAccount, IRemovable { }


