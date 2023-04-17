import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeederInfo } from '../models/FeederInfo';
import { FeederService } from '../services/feeder.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-feeder',
	templateUrl: './feeder.component.html',
	styleUrls: ['./feeder.component.scss']
})
export class FeederComponent implements OnInit, OnDestroy {
	feederInfos: FeederInfo[] = [];
	selectedItem: FeederInfo;
	wsSub: Subscription;

	constructor(private feederService: FeederService, private websocketService: WebsocketService) { }

	ngOnInit(): void {
		this.getFeederList();
		this.subscribeFeederWebsocket();
	}

	ngOnDestroy(): void {
		this.wsSub.unsubscribe();
	}

	selectItem(item: FeederInfo): void {
		this.selectedItem = item;
	}

	getFeederList(): void {
		this.feederService.getFeederList().subscribe(res => {
			this.feederInfos = res;
		});
	}

	subscribeFeederWebsocket(): void {
		this.wsSub = this.websocketService.getMessageSubscription('feederUpdate').subscribe(message => {
			this.getFeederList();
		})
	}
}
