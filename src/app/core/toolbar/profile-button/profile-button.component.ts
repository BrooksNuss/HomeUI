import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-profile-button',
	templateUrl: './profile-button.component.html',
	styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent implements OnInit {

	constructor(private authService: AuthService) { }

	ngOnInit(): void {
	}

	async logout(): Promise<void> {
		await this.authService.logout();
	}
}
