import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Amplify, {Auth} from 'aws-amplify';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginFlowStep } from '../models/login-flow-step.model';
import { MfaSetupData } from '../models/MfaSetupData';

@Injectable()
export class AuthService {
	private isLoggedIn$ = new BehaviorSubject<boolean>(false);
	isLoggedIn = this.isLoggedIn$.asObservable();
	redirectUrl: string = '';
	private currentStep$ = new BehaviorSubject<LoginFlowStep>('login');
	currentStep = this.currentStep$.asObservable();
	cognitoUser: any;
	username: string;
	password: string;

	constructor(private router: Router) {}

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
			this.username = username;
			this.password = password;
			switch (this.cognitoUser.challengeName) {
			case ('NEW_PASSWORD_REQUIRED'):
				this.router.navigate([{outlets: {auth: ['update-password']}}]);
				break;
			case ('MFA_SETUP'):
				this.router.navigate([{outlets: {auth: ['mfa-setup']}}]);
				break;
			case ('SOFTWARE_TOKEN_MFA'):
				this.router.navigate([{outlets: {auth: ['mfa-code']}}]);
				break;
			}
			return null;
		} catch (err) {
			console.error(err);
			return err;
		}
	}

	async resetPassword(username: string): Promise<void> {
		this.username = username;
		// need some logic here to send an email to the admin
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 1000);
		})
	}

	confirmResetPassword(code: string, password: string): Promise<string> {
		return Auth.forgotPasswordSubmit(this.username, code, password);
	}

	async setupMfa(): Promise<MfaSetupData> {
		const code = await Auth.setupTOTP(this.cognitoUser);
		return await {code, username: this.username};
	}

	async verifyMfaCode(code: string): Promise<boolean> {
		try {
			await Auth.verifyTotpToken(this.cognitoUser, code);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	async updatePassword(password: string): Promise<any> {
		try {
			this.cognitoUser = await Auth.completeNewPassword(this.cognitoUser, password);
			switch (this.cognitoUser.challengeName) {
			case ('MFA_SETUP'):
				this.router.navigate([{outlets: {auth: ['mfa-setup']}}]);
				break;
			case ('SOFTWARE_TOKEN_MFA'):
				this.router.navigate([{outlets: {auth: ['mfa-code']}}]);
				break;
			}
		} catch (err) {
			console.error(err);
			return err;
		}
	}
}
