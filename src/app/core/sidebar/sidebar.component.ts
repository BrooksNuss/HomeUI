import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidebarItem } from '../models/sidebar-item.model';
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
    feederItem: SidebarItem = {
    	itemText: 'Cat Feeder',
    	iconName: 'pets',
    	action: () => {
    		this.router.navigate(['/home/feeder']);
    	}
    }

    constructor(private sidebarService: SidebarService, private router: Router) { }

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
