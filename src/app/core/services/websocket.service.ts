import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { filter, Observable } from 'rxjs';
import { WebsocketMessage, WebsocketSubscribeMessage, WebsocketSubscriptionType } from '../models/websocket-message.model';

@Injectable({
	providedIn: 'root'
})
export class WebsocketService {
	private wsSubject: WebSocketSubject<WebsocketMessage<any>>;
	private token: string;
	private authComplete = false;

	constructor(private authService: AuthService) {}
	
	public async createWebsocketConnection(): Promise<void> {
		return new Promise<void>(async (resolve, reject) => {
			if (this.wsSubject) {
				reject('Websocket already created');
			}
			this.authComplete = true;
			this.token = await this.authService.getAuthToken();
			this.wsSubject = webSocket<WebsocketMessage<WebsocketSubscriptionType>>(environment.wsUrl + '?token=' + this.token);
			resolve();
		})
	}

	public async closeWebsocketConnection(): Promise<void> {
		if (this.wsSubject) {
			this.wsSubject.complete();
		}
	}

	public getMessageSubscription<T extends WebsocketSubscriptionType>(messageType: T): Observable<WebsocketMessage<T>> {
		if (this.authComplete) {
			this.addSubscription(messageType);
			return this.wsSubject.pipe(filter((message: WebsocketMessage<T>) => 
				message.subscriptionType === messageType
			));
		} else throw new Error('User not authenticated');
	}

	public addSubscription<T extends WebsocketSubscriptionType>(messageType: T): void {
		if (this.authComplete) {
			const message: WebsocketSubscribeMessage<T> = {
				subscriptionType: messageType,
				value: 'subscribe'
			}
			this.wsSubject.next(message);
		}
	}

	public removeSubscription<T extends WebsocketSubscriptionType>(messageType: T): void {
		if (this.authComplete) {
			const message: WebsocketSubscribeMessage<T> = {
				subscriptionType: messageType,
				value: 'unsubscribe'
			}
			this.wsSubject.next(message);
		}
	}
}
