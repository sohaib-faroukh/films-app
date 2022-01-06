import { ID } from './id';
import { ILogged } from './logged';

export interface IBaseModel extends ILogged {
	id?: ID;
}
