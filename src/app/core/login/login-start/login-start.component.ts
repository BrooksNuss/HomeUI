import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoadingButtonComponent } from 'src/app/shared/components/loading-button/loading-button.component';
import { LoginModalStep } from '../abstract/LoginModalStep';

@Component({
	selector: 'app-login-start',
	templateUrl: './login-start.component.html',
	styleUrls: ['./login-start.component.scss']
})
export class LoginStartComponent extends LoginModalStep implements OnInit {
	@ViewChild(LoadingButtonComponent) loginButton: LoadingButtonComponent;
	username = new FormControl('', [Validators.minLength(1)]);
	password = new FormControl('', [Validators.minLength(8)]);
	invalidLogin = false;

	constructor(injector: Injector) {
		super(injector, 'login');
	}

	ngOnInit(): void {}

	async submitLogin(): Promise<void> {
		this.loginButton.busy = true;
		const loginError = await this.authService.signIn(this.username.value!, this.password.value!);
		this.loginButton.busy = false;
		if (loginError) {
			this.handleError(loginError);
		}
	}

	resetPassword(): void {
		this.router.navigate([{outlets: {auth: ['password-reset']}}]);
	}

	handleError(err: any): void {
		if (err.message === 'Incorrect username or password.') {
			this.invalidLogin = true;
		}
	}
}
