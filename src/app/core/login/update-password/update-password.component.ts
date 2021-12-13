import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginModalStep } from '../abstract/LoginModalStep';

@Component({
	selector: 'app-update-password',
	templateUrl: './update-password.component.html',
	styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent extends LoginModalStep implements OnInit {
	password = new FormControl('', [Validators.minLength(8)]);
	confirmPassword = new FormControl('', [Validators.minLength(8)]);
	error = false;

	constructor(injector: Injector) {
		super(injector, 'update-password');
	}

	ngOnInit(): void {
	}

	async submitUpdatePassword(): Promise<void> {
		const result = await this.authService.updatePassword(this.password.value);
		if (result) {
			this.handleError(result);
		}
	}

	handleError(err: any): void {
		if (err.message) {
			this.error = true;
		}
	}
}
