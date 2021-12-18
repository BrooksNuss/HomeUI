import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Amplify, {Auth} from 'aws-amplify';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginFlowStep } from '../models/login-flow-step.model';
import { MfaSetupData } from '../models/MfaSetupData';

@Injectable()
export class AuthService {
	private isLoggedIn$ = new ReplaySubject<boolean>(1);
	isLoggedIn = this.isLoggedIn$.asObservable();
	redirectUrl: string = 'home';
	private currentStep$ = new BehaviorSubject<LoginFlowStep>('login');
	currentStep = this.currentStep$.asObservable();
	cognitoUser: any;
	username: string;
	password: string;
	private isBusy$ = new BehaviorSubject<boolean>(true);
	isBusy = this.isBusy$.asObservable();

	constructor(private router: Router) {}

	async initLoginStatus(): Promise<void> {
		Amplify.configure({
			Auth: {
				region: environment.region,
				userPoolId: environment.userPoolId,
				userPoolWebClientId: environment.userPoolWebClientId,
				mandatorySignIn: true
			}
		});
		
		try {
			const loggedIn = await Auth.currentAuthenticatedUser();
			this.isLoggedIn$.next(!!loggedIn);
		} catch (err) {
			this.isLoggedIn$.next(false);
			console.log(err);
		}
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
			this.cognitoUser = await Auth.verifyTotpToken(this.cognitoUser, code);
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

	async submitMfaChallenge(code: string): Promise<boolean> {
		try {
			await Auth.confirmSignIn(this.cognitoUser, code, 'SOFTWARE_TOKEN_MFA');
			this.isLoggedIn$.next(true);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}

	setBusy(busy: boolean): void {
		this.isBusy$.next(busy);
	}

	logout(): void {
		Auth.signOut();
	}
}
