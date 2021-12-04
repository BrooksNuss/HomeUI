import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
	username = '';
	password = '';

	ngOnInit(): void {}

	ngAfterViewInit(): void {}
}
