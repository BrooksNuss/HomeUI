import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders
} from '@angular/common/http';
import { from, Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return from(this.authService.getAuthToken())
			.pipe(switchMap(token => {
				const authReq = request.clone({
					headers: new HttpHeaders({
						'Authorization': token
					})
				});
				return next.handle(authReq);
			}));
	}
}
