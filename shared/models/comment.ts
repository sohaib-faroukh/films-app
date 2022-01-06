import { IBaseModel } from './generics/base-model';
import { ID } from './generics/id';

export interface IComment extends IBaseModel {
	content?: string;

	// film-id the the comment related to
	film: ID;

	// account-id of the comment owner
	owner: ID;
}
export interface ICommentVM extends IComment { }
