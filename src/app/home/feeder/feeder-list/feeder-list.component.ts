import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeederInfo } from '../../models/FeederInfo';

@Component({
	selector: 'app-feeder-list',
	templateUrl: './feeder-list.component.html',
	styleUrls: ['./feeder-list.component.scss']
})
export class FeederListComponent implements OnInit {
    @Input() feederItems: FeederInfo[];
    @Output() selectedItem = new EventEmitter<FeederInfo>();

    constructor() { }

    ngOnInit(): void {
    }

    selectItem(item: FeederInfo): void {
    	this.selectedItem.emit(item);
    }
}
