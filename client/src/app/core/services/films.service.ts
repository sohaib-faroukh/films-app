import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'client/src/environments/environment';
import { ICommentVM } from 'shared/models/comment';
import { IFilmVM } from 'shared/models/film';
import { ID } from 'shared/models/generics/id';
import { BaseCrudService } from '../models/base-crud-service';
import { HttpSearchOptions } from '../models/http-search-options';

@Injectable()
export class FilmsService extends BaseCrudService<IFilmVM, HttpSearchOptions>{


	public status: 'initial' | 'loading' | 'done' = 'initial';

	constructor ( public http: HttpClient ) {
		super( http );
		this.apiUrl = 'films';
		this.fetch().toPromise();
	}


	public uploadFilmImage = ( filmId: ID, file: File ) => {
		const payload = new FormData();
		const url = `${ this.apiUrl }/${ filmId.toString() }/upload-image`;
		payload.append( environment.FileUploaderFieldName || 'file', file );
		return this.pipes( this.http.post<IFilmVM>( url, payload ), true, false );
	}

	public getCommentsByFilmId = ( filmId: ID ) => {
		const url = `${ this.apiUrl }/${ filmId.toString() }/comments`;
		return this.http.get<ICommentVM[]>( url );
	}

}
