import { IBaseModel } from './generics/base-model';

export interface IFilm extends IBaseModel {
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
