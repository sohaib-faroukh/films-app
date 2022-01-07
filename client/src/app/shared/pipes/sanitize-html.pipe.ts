import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe( {
	name: 'sanitizeUrl', pure: true,
} )
export class SanitizeUrlPipe implements PipeTransform {
	constructor ( private sanitizer: DomSanitizer ) { }

	transform ( value: string ): unknown {
		console.log( value );

		return this.sanitizer.bypassSecurityTrustUrl( value );
	}

}
