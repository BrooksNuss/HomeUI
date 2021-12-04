import { Injectable } from '@angular/core';
import Amplify, {Auth} from 'aws-amplify';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	isLoggedIn: boolean = false;
	redirectUrl: string = '';

	constructor() {}

	async initLoginStatus(): Promise<boolean> {
		Amplify.configure({
			Auth: {
				region: environment.region,
				userPoolId: environment.userPoolId,
				userPoolWebClientId: environment.userPoolWebClientId,
				mandatorySignIn: true
			}
		});
		
		try {
			this.isLoggedIn = !!(await Auth.currentAuthenticatedUser());
		} catch (err) {
			console.error(err);
			this.isLoggedIn = false;
		}
		return this.isLoggedIn;
	}
}
