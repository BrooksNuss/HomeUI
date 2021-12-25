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
			lastActive: 123456789,
			nextActive: 123456999,
			interval: 123456789,
			estRemainingFood: 50,
			estRemainingFeedings: 5
		},
		{
			name: 'Treats Feeder',
			status: 'INACTIVE',
			id: 'def456',
			lastActive: 987654321,
			nextActive: 999654321,
			interval: 123456789,
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
