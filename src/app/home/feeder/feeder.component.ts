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
			"id": "mainFeeder",
			"lastActive": "1645344276283",
			"interval": "12:00:00",
			"estRemainingFood": 50,
			"status": "OFFLINE",
			"estRemainingFeedings": 5,
			"name": "Main Feeder",
			"nextActive": "1645344276283"
		},
		{
			"id": "treatFeeder",
			"lastActive": "1645344276283",
			"interval": "12:00:00",
			"estRemainingFood": 80,
			"status": "OFFLINE",
			"estRemainingFeedings": 16,
			"name": "Treats Feeder",
			"nextActive": "1645344276283"
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
