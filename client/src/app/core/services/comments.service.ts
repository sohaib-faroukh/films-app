import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommentVM } from 'shared/models/comment';
import { BaseCrudService } from '../models/base-crud-service';
import { HttpSearchOptions } from '../models/http-search-options';

@Injectable()
export class CommentsService extends BaseCrudService<ICommentVM, HttpSearchOptions>{


	public status: 'initial' | 'loading' | 'done' = 'initial';

	constructor ( public http: HttpClient ) {
		super( http );
		this.apiUrl = 'comments';
		this.fetch().toPromise();
	}



}
