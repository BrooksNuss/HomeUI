import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from '../services/sidebar.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
	private sidebarSub: Subscription;
	sidebarOpen = false;
    @Output() sidebarChange = new EventEmitter();

    constructor(private sidebarService: SidebarService) { }

    ngOnInit(): void {
    	this.sidebarSub = this.sidebarService.expanded.subscribe(next => {
    		this.sidebarOpen = next;
    		this.sidebarChange.emit(next);
    	})
    }

    ngOnDestroy(): void {
    	this.sidebarSub.unsubscribe();
    }
}
