import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class SystemService {

	constructor ( private auth: AuthService ) { }

	logout = () => {
		this.auth.logout();
	}
}
