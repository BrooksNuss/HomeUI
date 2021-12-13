import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-loading-button',
	templateUrl: './loading-button.component.html',
	styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {
	@Input() buttonDisabled = false;
	@Input() visible = true;
	@Input() text = '';
	@Input() customClass = '';
	@Output() buttonClick = new EventEmitter();
	busy = false;

	constructor() { }

	ngOnInit(): void {
	}

	onClick(): void {
		this.buttonClick.emit();
	}
}
