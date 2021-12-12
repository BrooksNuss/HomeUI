import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import { LoginFlowStep } from "../../models/login-flow-step.model";
import { AuthService } from "../../services/auth.service";

export abstract class LoginModalStep {
	protected authService: AuthService;
	protected router: Router
    

	constructor(injector: Injector, step: LoginFlowStep) {
		this.authService = injector.get(AuthService);
		this.router = injector.get(Router);
		this.authService.setCurrentLoginStep(step);
	}
}