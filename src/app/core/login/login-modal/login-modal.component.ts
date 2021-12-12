import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginFlowStep } from '../../models/login-flow-step.model';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login-modal',
	templateUrl: './login-modal.component.html',
	styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit, AfterViewInit {
	username = '';
	password = '';
	loginFlowSub: Subscription;
	loginStep: LoginFlowStep;


	constructor(private authService: AuthService, private router: Router, private location: Location) {}

	ngOnInit(): void {
		this.loginFlowSub = this.authService.currentStep.subscribe(next => {
			this.loginStep = next;
		})
	}

	ngAfterViewInit(): void {
		this.router.navigate([{outlets: {auth: ['login']}}]);
	}

	goToPreviousStep(): void {
		if (this.loginStep !== 'login') {
			this.location.back();
		}
	}
}
