import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { SidebarService } from './core/services/sidebar.service';
import { WebsocketService } from './core/services/websocket.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	animations: [
		trigger('sidebarMinimize', [
			state('open', style({ width: '120px' })),
			state('closed', style({ width: '34px' })),
			transition('closed => open', [
				animate('.25s ease'),
			]),
			transition('open => closed', [
				animate('.25s ease'),
			])
		]),
		trigger('sidebarMinimizeContent', [
			state('open', style({ 'margin-left': '120px' })),
			state('closed', style({ 'margin-left': '34px' })),
			transition('open <=> closed', animate('.25s ease'))
		]),
	]
})
export class AppComponent implements OnInit, OnDestroy {
	isLoggedIn: boolean = false;
	title = 'homeUi';
	sidebarOpen = false;
	wsSub: Subscription;

	constructor(private authService: AuthService, private websocketService: WebsocketService) {}

	async ngOnInit(): Promise<void> {
		await this.authService.initLoginStatus();
		// Handle auth status changes
		this.authService.isLoggedIn.subscribe(async next => {
			this.isLoggedIn = next;
			// Open/close websocket based on auth status
			this.updateWebsocketState();
		});
	}

	ngOnDestroy(): void {
		this.wsSub.unsubscribe();
	}

	setSidebarOpen(value: boolean): void {
		this.sidebarOpen = value;
	}

	async updateWebsocketState(): Promise<void> {
		if (this.isLoggedIn) {
			await this.websocketService.createWebsocketConnection();
			try {
				const subscription = await this.websocketService.getMessageSubscription('global')
				if (subscription) {
					this.wsSub = subscription.subscribe(message => {
						console.log('global message' + message);
					});
				}
			} catch (err) {
				console.error(err);
			}
		} else {
			this.websocketService.closeWebsocketConnection();
		}
	}
}
