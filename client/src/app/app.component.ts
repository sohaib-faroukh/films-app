import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { RoutingService } from './core/services/routing.service';

@Component( {
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ],
} )
export class AppComponent implements OnInit {
	title = 'Films App';
	constructor ( public auth: AuthService, public routingService: RoutingService ) { }
	async ngOnInit (): Promise<void> {
		// await this.auth.isAuth();
	}
}
