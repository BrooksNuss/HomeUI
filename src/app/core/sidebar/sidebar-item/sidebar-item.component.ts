import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { SidebarItem } from '../../models/sidebar-item.model';

@Component({
	selector: 'app-sidebar-item',
	templateUrl: './sidebar-item.component.html',
	styleUrls: ['./sidebar-item.component.scss'],
	animations: [
		trigger('sidebarOpen', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('.25s', style({ opacity: 1}))
			]),
			transition(':leave', [
				animate('.25s', style({ opacity: 0 }))
			])
		])
	]
})
export class SidebarItemComponent implements OnInit {
	private _expanded = false;
	@Input() set expanded(value: boolean) {
		setTimeout(() => {
			this._expanded = value;
		}, 0);
	}
	get expanded(): boolean {
		return this._expanded;
	}
	@Input() item: SidebarItem;

	constructor() { }

	ngOnInit(): void {
	}
}
