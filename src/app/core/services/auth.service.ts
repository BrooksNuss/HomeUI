import { Injectable } from '@angular/core';
import Amplify, {Auth} from 'aws-amplify';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginFlowStep } from '../models/login-flow-step.model';

@Injectable()
export class AuthService {
	private isLoggedIn$ = new BehaviorSubject<boolean>(false);
	isLoggedIn = this.isLoggedIn$.asObservable();
	redirectUrl: string = '';
	private currentStep$ = new BehaviorSubject<LoginFlowStep>('login');
	currentStep = this.currentStep$.asObservable();
	cognitoUser: any;

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
			this.isLoggedIn$.next(!!await Auth.currentAuthenticatedUser());
			return true;
		} catch (err) {
			console.log(err);
		}
		return false;
	}

	setCurrentLoginStep(step: LoginFlowStep): void {
		this.currentStep$.next(step);
	}

	async signIn(username: string, password: string): Promise<any> {
		try {
			this.cognitoUser = await Auth.signIn(username, password);
			switch (this.cognitoUser.challengeName) {
			case ('NEW_PASSWORD_REQUIRED'):
				this.currentStep$.next('reset-password');
				break;
			case ('MFA_SETUP'):
				this.currentStep$.next('mfa-setup');
				break;
			case ('SOFTWARE_TOKEN_MFA'):
				this.currentStep$.next('mfa-login');
				break;
			}
			return null;
		} catch (err) {
			console.error(err);
			return err;
		}
	}

	resetPassword(username: string): Promise<void> {
		return Auth.forgotPassword(username);
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
