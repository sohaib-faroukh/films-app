import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component( {
	selector: 'app-rating-five-stars',
	templateUrl: './rating-five-stars.component.html',
	styleUrls: [ './rating-five-stars.component.scss' ],
	changeDetection: ChangeDetectionStrategy.OnPush,
} )
export class RatingFiveStarsComponent implements OnInit {

	@Input() public rating = 0;
	constructor () { }

	ngOnInit (): void {
	}

}
