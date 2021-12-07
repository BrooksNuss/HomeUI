import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

	constructor(private sidebarService: SidebarService) { }

	ngOnInit(): void {
	}

	toggleSidebar(): void {
		this.sidebarService.toggleSidebar();
	}
}
