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
	@ViewChild('updatePanelHeader', {read: ElementRef}) updatePanelHeader: ElementRef;
	@Input() selectedItem: FeederInfo;
	disableFeed = false;
	disableSkip = false;
	disableFoodEdit = false;
	disableIntervalEdit = false;
	editedFoodLevel: number;
	editedIntervalH: number | null;
	editedIntervalM: number | null;
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
		if (showFood === this.showFoodUpdate) {
			this.updatePanelHeader.nativeElement.click();
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
		this.disableFoodEdit = true;
		const updateRequest: FeederUpdateRequest = {estRemainingFood: this.editedFoodLevel};
		this.feederService.updateFeeder(this.selectedItem.id, updateRequest).subscribe({
			next: (res) => {
				this.updatePanel.close();
				this.disableFoodEdit = false;
				this.editedFoodLevel = 0;
				console.log(res);
			},
			error: err => console.error(err)
		});
	}

	updateInterval() {
		this.disableIntervalEdit = true;
		const updateRequest: FeederUpdateRequest = {interval: this.editedIntervalH + ':' + this.editedIntervalM};
		this.feederService.updateFeeder(this.selectedItem.id, updateRequest).subscribe({
			next: res => {
				this.updatePanel.close();
				this.disableIntervalEdit = false;
				this.editedIntervalH = null;
				this.editedIntervalM = null;
				console.log(res);
			},
			error: err => console.error(err)
		});
	}
}
