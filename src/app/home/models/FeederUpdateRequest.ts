export interface FeederUpdateRequest {
    id?: string;
    name?: string;
    status?: 'ONLINE' | 'OFFLINE';
    interval?: string;
    estRemainingFood?: number;
	description?: string;
}