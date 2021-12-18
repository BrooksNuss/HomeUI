import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { LoadingButtonComponent } from 'src/app/shared/components/loading-button/loading-button.component';
import { LoginModalStep } from '../abstract/LoginModalStep';

@Component({
	selector: 'app-mfa-code',
	templateUrl: './mfa-code.component.html',
	styleUrls: ['./mfa-code.component.scss']
})
export class MfaCodeComponent extends LoginModalStep implements OnInit {
    @ViewChild(LoadingButtonComponent) loginButton: LoadingButtonComponent;
    code = '';
    validCode = true;

    constructor(injector: Injector) {
    	super(injector, 'mfa-login');
    }

    ngOnInit(): void {
    }

    async submitCode(): Promise<void> {
    	this.loginButton.busy = true;
    	this.validCode = await this.authService.submitMfaChallenge(this.code);
    	this.loginButton.busy = false;
    }
}
