import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { filter, Observable } from 'rxjs';
import { WebsocketMessage, WebsocketMessageType } from '../models/websocket-message.model';

@Injectable({
	providedIn: 'root'
})
export class WebsocketService {
	private wsSubject: WebSocketSubject<WebsocketMessage<any>>;

	constructor(private authService: AuthService) {
		this.createWebsocketConnection();
	}

	private async createWebsocketConnection(): Promise<void> {
		const token = await this.authService.getAuthToken();
		this.wsSubject = webSocket(environment.wsUrl + '?token=' + token);
	}

	public getMessageSubscription<T extends WebsocketMessageType>(messageType: T): Observable<WebsocketMessage<T>> {
		return this.wsSubject.pipe(filter((message) => 
			message.subscriptionType === messageType
		));
	}
}
