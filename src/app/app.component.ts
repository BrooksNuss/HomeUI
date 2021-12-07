import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { SidebarService } from './core/services/sidebar.service';

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
export class AppComponent implements OnInit {
	isLoggedIn: boolean = false;
	title = 'homeUi';
	sidebarSub: Subscription;
	sidebarOpen = false;

	constructor(private authService: AuthService, private sidebarService: SidebarService) {}

	async ngOnInit(): Promise<void> {
		this.isLoggedIn = await this.authService.initLoginStatus();
		this.sidebarSub = this.sidebarService.expanded.subscribe(next => {
			this.sidebarOpen = next;
		})
	}
}
