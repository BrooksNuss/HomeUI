import { Component, Input, OnInit } from '@angular/core';
import { FeederInfo } from '../../models/FeederInfo';

@Component({
	selector: 'app-feeder-detail',
	templateUrl: './feeder-detail.component.html',
	styleUrls: ['./feeder-detail.component.scss']
})
export class FeederDetailComponent implements OnInit {
    @Input() selectedItem: FeederInfo;
    disableFeed = false;
    disableSkip = false;

    constructor() { }

    ngOnInit(): void {
    }

    activateFeeder() {

    }

    skipFeeder() {

    }
}
