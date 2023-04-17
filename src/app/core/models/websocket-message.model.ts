export interface WebsocketMessage<T extends WebsocketMessageType> {
	subscriptionType: string,
	value: T;
}

export type WebsocketMessageType = 'feederUpdate' | 'global';