import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	private isLoggedIn: boolean;

	constructor(private authService: AuthService, private router: Router) {
		authService.isLoggedIn.subscribe(next => {
			this.isLoggedIn = next;
		})
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
		if (this.isLoggedIn) {
			return true;
		}

		this.authService.redirectUrl = state.url;
		
		return this.router.parseUrl('/auth');
	}
}
