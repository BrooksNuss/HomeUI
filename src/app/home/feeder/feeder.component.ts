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
			status: 'INACTIVE'
		},
		{
			name: 'Treat Feeder',
			status: 'INACTIVE'
		}
	]

	constructor() { }

	ngOnInit(): void {
	}

}