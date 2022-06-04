import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { FeederInfo } from '../../models/FeederInfo';
import { FeederUpdateRequest } from '../../models/FeederUpdateRequest';
import { FeederService } from '../../services/feeder.service';

@Component({
	selector: 'app-feeder-detail',
	templateUrl: './feeder-detail.component.html',
	styleUrls: ['./feeder-detail.component.scss']
})
export class FeederDetailComponent implements OnInit {
	@ViewChild('updatePanel') updatePanel: MatExpansionPanel;
	@Input() selectedItem: FeederInfo;
	disableFeed = false;
	disableSkip = false;
	disableUpdate = false;
	editedFoodLevel: string | null;
	editedIntervalH: string | null;
	editedIntervalM: string | null;
	showFoodUpdate: boolean;
	updateString: string;

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
		this.feederService.skipNextFeeding(this.selectedItem.id).subscribe({
			next: res => console.log(res),
			error: err => console.error(err),
			complete: () => this.disableSkip = false
		})
	}

	openUpdate(showFood: boolean) {
		if (showFood === this.showFoodUpdate && this.updatePanel.expanded) {
			setTimeout(() => {
				this.updatePanel.close();
			}, 0);
		}
		this.showFoodUpdate = showFood;
		if (showFood) {
			this.updateString = 'food level';
		} else {
			this.updateString = 'activation interval';
		}
		this.updatePanel.open();
	}

	updateFoodLevel() {
		if (this.editedFoodLevel === null) {
			return;
		}
		this.disableUpdate = true;
		const updateRequest: FeederUpdateRequest = {estRemainingFood: parseInt(this.editedFoodLevel)};
		this.feederService.updateFeeder(this.selectedItem.id, updateRequest).subscribe({
			next: (res) => {
				this.updatePanel.close();
				this.editedFoodLevel = null;
				console.log(res);
			},
			error: err => console.error(err),
			complete: () => this.disableUpdate = false
		});
	}

	updateInterval() {
		if (this.editedIntervalH === null && this.editedIntervalM === null) {
			return;
		}
		this.disableUpdate = true;
		const updateRequest: FeederUpdateRequest = {interval: (this.editedIntervalH ? this.editedIntervalH : 0) + ':' + (this.editedIntervalM ? this.editedIntervalM : '00')};
		this.feederService.updateFeeder(this.selectedItem.id, updateRequest).subscribe({
			next: res => {
				this.updatePanel.close();
				this.editedIntervalH = null;
				this.editedIntervalM = null;
				console.log(res);
			},
			error: err => console.error(err),
			complete: () => this.disableUpdate = false
		});
	}
}
