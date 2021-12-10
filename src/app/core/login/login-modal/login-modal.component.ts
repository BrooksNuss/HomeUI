import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginFlowStage } from '../../models/login-flow-stage.model';
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
	loginFlow: LoginFlowStage;

	constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.loginFlowSub = this.authService.currentFlow.subscribe(next => {
			this.loginFlow = next;
		})
	}

	ngAfterViewInit(): void {
		this.router.navigate([{outlets: {auth: ['login']}}]);
	}
}
