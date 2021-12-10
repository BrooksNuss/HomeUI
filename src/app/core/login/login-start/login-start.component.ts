import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login-start',
	templateUrl: './login-start.component.html',
	styleUrls: ['./login-start.component.scss']
})
export class LoginStartComponent implements OnInit {
	username: string;
	password: string;

	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	async submitLogin(): Promise<void> {
		const loginError = await this.authService.signIn(this.username, this.password);
		if (loginError) {
			this.handleError(loginError);
		}
	}

	resetPassword(): void {
		// this.loginStepChange.emit('resetPassword');
		this.router.navigate([{outlets: {auth: ['password-reset']}}]);
	}

	handleError(err: any): void {

	}
}
