import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { LoginModalStep } from '../abstract/LoginModalStep';
import * as qrCode from 'qrcode';

@Component({
	selector: 'app-mfa-qr',
	templateUrl: './mfa-setup.component.html',
	styleUrls: ['./mfa-setup.component.scss']
})
export class MfaSetupComponent extends LoginModalStep implements OnInit, AfterViewInit {
	code: string;
	qrUri: string;
	codeAccepted = true;

	constructor(injector: Injector) {
		super(injector, 'mfa-setup');
	}

	ngOnInit(): void {
	}

	ngAfterViewInit(): void {
		this.generateQrCode();
	}

	async generateQrCode(): Promise<void> {
		try {
			const mfaSetupData = await this.authService.setupMfa();
			const totpUri = "otpauth://totp/AWSCognito:"+ mfaSetupData.username + "?secret=" + mfaSetupData.code + "&issuer=HomeApp";
			qrCode.toDataURL(totpUri, (err, url) => {
				if (err) {
					console.log(err);
				} else {
					this.qrUri = url;
				}
			})
		} catch (err) {
			console.error(err);
		}
	}

	async verifyCode(): Promise<void> {
		const valid = await this.authService.verifyMfaCode(this.code);
		if (valid) {
			this.router.navigate(['home']);
		}
	}
}
