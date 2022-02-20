import { Component, Input, OnInit } from '@angular/core';
import { FeederInfo } from '../../models/FeederInfo';
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

    constructor(private feederService: FeederService) { }

    ngOnInit(): void {
    }

    activateFeeder() {
    	this.feederService.activateFeeder(this.selectedItem.id);
    }

    skipFeeder() {
    	this.feederService.skipNextFeeding(this.selectedItem.id);
    }
}
