import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginModalComponent } from './login-modal/login-modal.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements AfterViewInit, OnInit {
	private dialog: MatDialogRef<LoginModalComponent>;

	constructor(private dialogService: MatDialog) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.dialog = this.dialogService.open(LoginModalComponent, {
			height: '500px',
			width: '300px',
			disableClose: true,
			closeOnNavigation: false
		});
	}
}
