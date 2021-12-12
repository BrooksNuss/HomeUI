import { Component, Injector, OnInit } from '@angular/core';
import { LoginModalStep } from '../abstract/LoginModalStep';

@Component({
	selector: 'app-login-start',
	templateUrl: './login-start.component.html',
	styleUrls: ['./login-start.component.scss']
})
export class LoginStartComponent extends LoginModalStep implements OnInit {
	username: string;
	password: string;

	constructor(injector: Injector) {
		super(injector, 'login');
	}

	ngOnInit(): void {}

	async submitLogin(): Promise<void> {
		const loginError = await this.authService.signIn(this.username, this.password);
		if (loginError) {
			this.handleError(loginError);
		}
	}

	resetPassword(): void {
		this.router.navigate([{outlets: {auth: ['password-reset']}}]);
	}

	handleError(err: any): void {

	}
}
