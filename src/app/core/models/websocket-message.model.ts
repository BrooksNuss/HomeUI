export interface WebsocketSubscribeMessage<T extends WebsocketSubscriptionType> extends WebsocketMessage<T> {
	value: WebsocketSubscriptionAction;
}

export interface WebsocketMessage<T extends WebsocketSubscriptionType> {
	subscriptionType: T,
	value: any
}

export type WebsocketSubscriptionType = 'feederUpdate' | 'global';
export type WebsocketSubscriptionAction = 'subscribe' | 'unsubscribe';