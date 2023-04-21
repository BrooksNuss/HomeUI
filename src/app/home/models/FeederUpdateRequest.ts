export interface FeederUpdateRequest {
    id?: string;
    name?: string;
    enabled?: boolean;
    interval?: string;
    estRemainingFood?: number;
	description?: string;
}