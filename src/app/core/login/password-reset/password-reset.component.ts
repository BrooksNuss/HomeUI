import { Component, Injector, OnInit } from '@angular/core';
import { LoginModalStep } from '../abstract/LoginModalStep';

@Component({
	selector: 'app-password-reset',
	templateUrl: './password-reset.component.html',
	styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends LoginModalStep implements OnInit {
	username: string;

	constructor(injector: Injector) {
		super(injector, 'reset-password');
	}

	ngOnInit(): void {
	}

	async submit(): Promise<void> {
		await this.authService.resetPassword(this.username);
	}
}
