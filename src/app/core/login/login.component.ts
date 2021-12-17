import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnInit, OnDestroy {
	private dialog: MatDialogRef<LoginModalComponent>;
	private loginSub: Subscription;

	constructor(private dialogService: MatDialog, private authService: AuthService) {}

	ngOnInit(): void {
		this.authService.isLoggedIn.subscribe(next => {
			if (next && this.dialog) {
				this.dialog.close();
			}
		})
	}

	ngOnDestroy(): void {
		if (this.loginSub) {
			this.loginSub.unsubscribe();
		}
	}

	ngAfterViewInit(): void {
		this.dialog = this.dialogService.open(LoginModalComponent, {
			height: '500px',
			width: '300px',
			disableClose: true,
			closeOnNavigation: false
		});
	}
}
