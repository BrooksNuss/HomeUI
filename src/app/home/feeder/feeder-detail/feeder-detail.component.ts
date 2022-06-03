import { Component, Input, OnInit } from '@angular/core';
import { FeederInfo } from '../../models/FeederInfo';
import { FeederUpdateRequest } from '../../models/FeederUpdateRequest';
import { FeederService } from '../../services/feeder.service';

@Component({
	selector: 'app-feeder-detail',
	templateUrl: './feeder-detail.component.html',
	styleUrls: ['./feeder-detail.component.scss']
})
export class FeederDetailComponent implements OnInit {
	@Input() selectedItem: FeederInfo;
	disableFeed = false;
	disableSkip = false;
	disableFoodEdit = false;
	disableIntervalEdit = false;
	editedFoodLevel = 0;
	editedInterval: Date;

	constructor(private feederService: FeederService) { }

	ngOnInit(): void {
		console.log(this.selectedItem);
	}

	activateFeeder() {
		this.disableFeed = true;
		this.feederService.activateFeeder(this.selectedItem.id).subscribe(res => {
			this.disableFeed = false;
			console.log(res);
		});
	}

	skipFeeder() {
		this.disableSkip = true;
		this.feederService.skipNextFeeding(this.selectedItem.id).subscribe(res => {
			this.disableSkip = false;
			console.log(res);
		});
	}

	editFoodLevel() {
		this.disableFoodEdit = true;
		const updateRequest: FeederUpdateRequest = {estRemainingFood: this.editedFoodLevel};
		this.feederService.updateFeeder(this.selectedItem.id, updateRequest).subscribe(res => {
			this.disableFoodEdit = false;
			this.editedFoodLevel = 0;
			console.log(res);
		});
	}

	editInterval() {
		this.disableIntervalEdit = true;
		const updateRequest: FeederUpdateRequest = {interval: this.editedInterval.getHours() + ':' + this.editedInterval.getMinutes() + ':' + this.editedInterval.getSeconds()};
		this.feederService.updateFeeder(this.selectedItem.id, updateRequest).subscribe(res => {
			this.disableIntervalEdit = false;
			this.editedInterval = new Date(this.selectedItem.interval);
			console.log(res);
		});
	}
}
