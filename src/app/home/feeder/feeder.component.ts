import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeederInfo } from '../models/FeederInfo';
import { FeederService } from '../services/feeder.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { Observable, Subscription } from 'rxjs';
import { WebsocketMessage, WebsocketSubscriptionType } from 'src/app/core/models/websocket-message.model';

@Component({
	selector: 'app-feeder',
	templateUrl: './feeder.component.html',
	styleUrls: ['./feeder.component.scss']
})
export class FeederComponent implements OnInit, OnDestroy {
	feederInfos: FeederInfo[] = [];
	selectedItem: FeederInfo;
	websocketSubType: WebsocketSubscriptionType = 'feederUpdate';
	websocketConnection: Observable<WebsocketMessage<'feederUpdate'>>;
	wsSub: Subscription;

	constructor(private feederService: FeederService, private websocketService: WebsocketService) { }

	ngOnInit(): void {
		this.getFeederList();
		this.subscribeFeederWebsocket();
	}

	ngOnDestroy(): void {
		this.websocketService.removeSubscription(this.websocketSubType);
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
		try {
			const subscription = this.websocketService.getMessageSubscription(this.websocketSubType);
			if (subscription) {
				this.wsSub = subscription.subscribe(message => {
					this.getFeederList();
				})
			}
		} catch (err) {
			console.error(err);
		}
	}
}
