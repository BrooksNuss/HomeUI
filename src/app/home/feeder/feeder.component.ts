import { Component, OnInit } from '@angular/core';
import { FeederInfo } from '../models/FeederInfo';

@Component({
	selector: 'app-feeder',
	templateUrl: './feeder.component.html',
	styleUrls: ['./feeder.component.scss']
})
export class FeederComponent implements OnInit {
	feederInfos: FeederInfo[] = [
		{
			name: 'Main Feeder',
			status: 'INACTIVE',
			id: 'abc123',
			lastActive: '2021-12-26T21:04:52.728Z',
			nextActive: '2021-12-27T3:04:52.728Z',
			interval: '12:00:00',
			estRemainingFood: 50,
			estRemainingFeedings: 5
		},
		{
			name: 'Treats Feeder',
			status: 'INACTIVE',
			id: 'treatfeeder',
			lastActive: '2021-12-27T3:04:52.728Z',
			nextActive: '2021-12-27T3:04:52.728Z',
			interval: '12:00:00',
			estRemainingFood: 80,
			estRemainingFeedings: 16
		},
	];
	selectedItem: FeederInfo;

	constructor() { }

	ngOnInit(): void {
	}

	selectItem(item: FeederInfo): void {
		this.selectedItem = item;
	}
}
