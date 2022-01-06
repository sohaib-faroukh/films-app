import { ID } from './generics/id';
import { ILogged } from './generics/logged';

export interface IFilm extends ILogged {
	id?: ID;
	name?: string;
	description?: string;
	releaseDate?: string;
	rating?: number;
	ticketPrice?: number;
	country?: string;
	genre?: string[];
	photo?: string;
}

export interface IFilmVM extends IFilm {
}
