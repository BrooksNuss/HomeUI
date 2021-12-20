import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeederInfo } from '../../models/FeederInfo';

@Component({
	selector: 'app-feeder-list-item',
	templateUrl: './feeder-list-item.component.html',
	styleUrls: ['./feeder-list-item.component.scss']
})
export class FeederListItemComponent implements OnInit {
    @Input() info: FeederInfo;
    @Output() selectedItem = new EventEmitter<FeederInfo>();

    constructor() { }

    ngOnInit(): void {
    }

    selectItem(): void {
    	this.selectedItem.emit(this.info);
    }
}
