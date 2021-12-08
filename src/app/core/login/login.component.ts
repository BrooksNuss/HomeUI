import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginFlowStage } from '../models/login-flow-stage.model';
import { AuthService } from '../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
	username = '';
	password = '';
	loginFlowSub: Subscription;
	loginFlow: LoginFlowStage;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.loginFlowSub = this.authService.currentFlow.subscribe(next => {
			this.loginFlow = next;
		})
	}

	ngAfterViewInit(): void {}
}
