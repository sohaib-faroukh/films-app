import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingFiveStarsComponent } from './components/rating-five-stars/rating-five-stars.component';



@NgModule( {
	declarations: [
		RatingFiveStarsComponent,
	],
	imports: [
		CommonModule,
	],
	exports: [
		RatingFiveStarsComponent,
	],
} )
export class RatingStarsModule { }
