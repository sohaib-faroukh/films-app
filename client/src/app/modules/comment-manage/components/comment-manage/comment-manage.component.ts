import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlertService } from 'client/src/app/core/services/alert.service';
import { AuthService } from 'client/src/app/core/services/auth.service';
import { CommentsService } from 'client/src/app/core/services/comments.service';
import { ICommentVM } from 'shared/models/comment';
import { ID } from 'shared/models/generics/id';

@Component( {
	selector: 'app-comment-manage',
	templateUrl: './comment-manage.component.html',
	styleUrls: [ './comment-manage.component.scss' ],
} )
export class CommentManageComponent implements OnInit {

	@Input() film?: ID;
	public owner?: ID;
	public loading = 0;
	@Output() commentSubmitted = new EventEmitter<ICommentVM>();

	public commentFormControl: FormControl = new FormControl( '', [ Validators.required, Validators.pattern( /^.\S.*/ ), Validators.minLength( 2 ), Validators.maxLength( 500 ) ] );
	constructor (
		public commentsService: CommentsService,
		public auth: AuthService,
		public alert: AlertService,
	) {
		this.owner = this.auth.loggedInAccount$.getValue()?.id;
	}

	ngOnInit (): void {
	}

	get isShow (): boolean {
		return ( !!this.film && !!this.owner );
	}


	public onCommentSubmit = async () => {
		try {
			this.loading = 3;
			if ( !this.owner ) throw new Error( 'please login first' );
			if ( !this.film ) throw new Error( 'please login first' );

			const payload: ICommentVM = {
				film: this.film,
				owner: this.owner,
				content: this.commentFormControl.value,
			} as ICommentVM;

			const addedComment = await this.commentsService.post( payload ).toPromise();
			await this.commentSubmitted.emit( addedComment );
			this.commentFormControl.reset();
		} catch ( error: any ) {
			this.alert.danger( error.message || error?.error.message || 'error happened while uploading the film image' );
		}
		finally {
			setTimeout( () => {
				this.loading = 0;
			}, 500 );
		}

	}

}
