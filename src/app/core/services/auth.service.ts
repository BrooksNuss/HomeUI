import { Injectable } from '@angular/core';
import Amplify, {Auth} from 'aws-amplify';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginFlowStage } from '../models/login-flow-stage.model';

@Injectable()
export class AuthService {
	isLoggedIn: boolean = false;
	redirectUrl: string = '';
	private currentFlow$ = new BehaviorSubject<LoginFlowStage>("login");
	currentFlow = this.currentFlow$.asObservable();

	cognitoUser: any;
	username: string = '';

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

	async signIn(username: string, password: string): Promise<void> {
		this.username = username;
		try {
			this.cognitoUser = await Auth.signIn(username, password);
			switch (this.cognitoUser.challengeName) {
			case ('NEW_PASSWORD_REQUIRED'):
				this.currentFlow$.next('resetPassword');
				break;
			case ('MFA_SETUP'):
				this.currentFlow$.next('qrCode');
				break;
			case ('SOFTWARE_TOKEN_MFA'):
				this.currentFlow$.next('mfaLogin');
				break;
			}
		} catch (err) {
			console.error(err);
		}
	}

	async handleMFASetup() {
		// move to qr component
		// try {
		// 	const code = await Auth.setupTOTP(this.cognitoUser);
		// 	const totpUri = "otpauth://totp/AWSCognito:"+ this.username + "?secret=" + code + "&issuer=HomeApp";
		// 	qrcode.toDataURL(totpUri, (err, url) => {
		// 		if (err) {
		// 			console.log(err);
		// 		} else {
		// 			this.qrUri = url;
		// 		}
		// 	})
		// 	console.log(code);
		// 	this.currentFlow = "qrCode";
		// } catch (err) {
		// 	console.error(err);
		// }
	}
}
