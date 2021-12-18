import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	private isLoggedIn: boolean;

	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean {
		this.authService.redirectUrl = this.clearAuthUrl(state.url);
		if (this.isLoggedIn) {
			return true;
		}
		this.authService.setBusy(true);
		return this.authService.isLoggedIn.pipe(map(next => {
			if (next) {
				this.isLoggedIn = true;
				return this.router.parseUrl(this.authService.redirectUrl);
			}
			this.isLoggedIn = false;
			this.authService.setBusy(false);
			this.router.navigate(['auth']);
			return false;
		}));
	}

	private clearAuthUrl(url: string): string {
		if (url.includes('auth')) {
			return 'home';
		}
		return url;
	}
}
