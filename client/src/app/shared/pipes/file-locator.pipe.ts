import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'client/src/environments/environment';

@Pipe( {
	name: 'fileLocator', pure: true,
} )
export class FileLocatorPipe implements PipeTransform {

	transform ( value: string ): string {
		return `${ !!environment.apiHost ? environment.apiHost + '/' : '' }${ value }`;
	}

}
