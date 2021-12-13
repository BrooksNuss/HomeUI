import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { LoadingButtonComponent } from 'src/app/shared/components/loading-button/loading-button.component';
import { ToastService } from '../../services/toast.service';
import { LoginModalStep } from '../abstract/LoginModalStep';

@Component({
	selector: 'app-password-reset',
	templateUrl: './password-reset.component.html',
	styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent extends LoginModalStep implements OnInit {
    @ViewChild(LoadingButtonComponent) submitButton: LoadingButtonComponent;
    username = '';
    result: any;

    constructor(injector: Injector, private toastService: ToastService) {
    	super(injector, 'reset-password');
    }

    ngOnInit(): void {}

    async submitUsername(): Promise<void> {
    	try {
    		this.submitButton.busy = true;
    		this.result = await this.authService.resetPassword(this.username);
    		this.submitButton.busy = false;
    		this.toastService.showToastMessage('Your password reset request has been sent to your administrator.', undefined, 5000);
    		await this.router.navigate([{outlets: {auth: ['login']}}]);
    	} catch (err) {
    		console.error(err);
    	}
    }
}
