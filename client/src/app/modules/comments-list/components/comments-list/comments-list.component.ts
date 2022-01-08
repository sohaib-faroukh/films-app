import { Component, Input, OnInit } from '@angular/core';
import { ICommentVM } from 'shared/models/comment';

@Component( {
	selector: 'app-comments-list',
	templateUrl: './comments-list.component.html',
	styleUrls: [ './comments-list.component.scss' ],
} )
export class CommentsListComponent implements OnInit {

	@Input() public comments: ICommentVM[] = [];
	constructor () { }

	ngOnInit (): void {
	}

}
