import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { FormatBigNumberPipe } from './format-big-number.pipe';
import { ListAsStringPipe } from './list-as-string.pipe';
import { RenderDateTimePipe } from './render-date-time.pipe';
import { SanitizeUrlPipe } from './sanitize-html.pipe';
import { FileLocatorPipe } from './file-locator.pipe';

const pipes = [
	FilterPipe,
	FormatBigNumberPipe,
	ListAsStringPipe,
	RenderDateTimePipe,
	SanitizeUrlPipe,
	FileLocatorPipe,
];

@NgModule( {
	declarations: [ ...pipes ],
	imports: [
		CommonModule,
	],
	exports: [ ...pipes ],
} )
export class PipesModule { }
