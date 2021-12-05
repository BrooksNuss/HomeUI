import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	isLoggedIn: boolean = false;
	title = 'homeUi';

	constructor(private authService: AuthService) {}

	async ngOnInit(): Promise<void> {
		this.isLoggedIn = await this.authService.initLoginStatus();
	}
}
