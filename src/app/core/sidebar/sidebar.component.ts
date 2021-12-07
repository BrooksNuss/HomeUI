import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from '../services/sidebar.service';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	

	constructor(private sidebarService: SidebarService) { }

	ngOnInit(): void {
		
	}
}
