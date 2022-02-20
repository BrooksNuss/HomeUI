import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpHeaders
} from '@angular/common/http';
import { firstValueFrom, from, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private authService: AuthService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return from(this.handle(request, next));
	}

	async handle(request: HttpRequest<any>, next: HttpHandler) {
		const token = await this.authService.getAuthToken();
		const authReq = request.clone({
			headers: new HttpHeaders({
				'Authorization': token
			})
		});
		return firstValueFrom(next.handle(authReq));
	}
}
