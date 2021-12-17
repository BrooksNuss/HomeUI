import { Component, Injector, OnInit } from '@angular/core';
import { LoginModalStep } from '../abstract/LoginModalStep';

@Component({
	selector: 'app-mfa-code',
	templateUrl: './mfa-code.component.html',
	styleUrls: ['./mfa-code.component.scss']
})
export class MfaCodeComponent extends LoginModalStep implements OnInit {
	code = '';
	validCode = true;

	constructor(injector: Injector) {
		super(injector, 'mfa-login');
	}

	ngOnInit(): void {
	}

	async submitCode(): Promise<void> {
		const valid = await this.authService.submitMfaChallenge(this.code);
		if (valid) {
			this.router.navigate(['home']);
		}
	}
}
