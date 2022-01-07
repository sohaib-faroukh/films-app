import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'client/src/app/core/services/alert.service';
import { AuthService } from 'client/src/app/core/services/auth.service';
import { FilmsService } from 'client/src/app/core/services/films.service';
import { ROUTES_MAP } from 'client/src/app/routes.map';
import { IFilmVM } from 'shared/models/film';
import { formatDate, getCurrentDate } from 'shared/utils/date.util';

@Component( {
	selector: 'app-film-manage',
	templateUrl: './film-manage.component.html',
	styleUrls: [ './film-manage.component.scss' ],
} )
export class FilmManageComponent implements OnInit {

	public film?: IFilmVM;
	public formGroup: FormGroup;
	public imageFormControl: FormControl;
	public imageFile?: File;
	public loading = 0;
	public readonly ratings = [
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
		{ id: 5 },
	];

	public readonly transformers: { [ key: string ]: PipeTransform } = {
		releaseDate: { transform: ( value: Date ) => formatDate( value ) },
		ticketPrice: { transform: ( v ) => !isNaN( v ) ? Number( v ) : 0 },
	};

	constructor (
		public auth: AuthService,
		public router: Router,
		public filmsService: FilmsService,
		public fb: FormBuilder,
		public alert: AlertService,
	) {

		if ( !this.auth.isAdmin ) {
			this.router.navigate( [ '/', ROUTES_MAP.unauthorized ] );
			throw new Error( 'error - unauthorized' );
		}

		const current = getCurrentDate();
		this.formGroup = this.fb.group( {
			name: [ undefined, [ Validators.required, Validators.minLength( 2 ), Validators.maxLength( 300 ) ] ],
			description: [ undefined, [ Validators.required, Validators.minLength( 5 ), Validators.maxLength( 1500 ) ] ],
			genre: [ [], [ Validators.required, Validators.minLength( 1 ) ] ],
			country: [ undefined, [ Validators.required, Validators.minLength( 2 ), Validators.maxLength( 300 ) ] ],
			rating: [ undefined, [ Validators.required, Validators.min( 1 ), Validators.max( 5 ) ] ],
			ticketPrice: [ undefined, [ Validators.required, Validators.min( 0 ) ] ],
			releaseDate: [ undefined, [ Validators.required ] ],
		} );
		this.imageFormControl = new FormControl( undefined, [ Validators.required ] );
	}

	ngOnInit (): void {
	}

	public control = ( name: string ): FormControl => {
		return this.formGroup.controls[ name ] as FormControl;
	}


	private transformValues = ( values: IFilmVM ): IFilmVM => {

		const result: any = { ...values };
		for ( const key in result ) {
			if ( result[ key ] && this.transformers[ key ] ) {
				result[ key ] = this.transformers[ key ].transform( result[ key ] );
			}
		}
		return result as IFilmVM;

	}

	public onSubmit = async (): Promise<void> => {
		try {
			this.loading = 3; // value of 3 means submitting, 0 means initial
			const value = this.transformValues( this.formGroup.value );
			console.log( '***** FileManageComponent - final values: ', value );
			this.film = await this.filmsService.post( value ).toPromise();
			this.formGroup.disable();
			this.alert.success( 'film info is saved successfully' );
		} catch ( error: any ) {
			this.alert.danger( error?.error.message || error?.message || 'an error happened while trying to add the film' );
		}
		finally {
			setTimeout( () => {
				this.loading = 0;
			}, 500 );
		}
	}

	private isFileImage = ( file: File ): boolean => {
		return ( file.type.split( '/' )[ 0 ] === 'image' );
	}

	public onFileUploadChange = ( event: File[] ) => {
		try {
			const file = event[ 0 ];
			if ( !this.isFileImage( file ) ) {
				this.imageFile = undefined;
				this.imageFormControl.setErrors( { invalidFileType: 'file should be an image type' } );
				this.imageFormControl.setValue( undefined );
				throw new Error( 'the file is not an image' );
			}
			this.imageFile = file;
		} catch ( error: any ) {
			this.alert.danger( error.message || error?.error.message || 'error happened while uploading the film image' );
		}
	}

	public onUploadImage = async () => {
		try {
			if ( !this.imageFile ) throw new Error( 'please upload a proper file first' );
			if ( !this?.film?.id ) throw new Error( 'please save the file data first' );

			await this.filmsService.uploadFilmImage( this.film.id, this.imageFile ).toPromise();
			this.alert.success( 'film image is saved successfully' );
			this.router.navigate( [ '../' ] );
		} catch ( error: any ) {
			this.alert.danger( error.message || error?.error.message || 'error happened while uploading the film image' );
		}
	}
}
