export interface FeederInfo {
    id: string;
    name: string;
    status: 'ACTIVE' | 'INACTIVE';
    lastActive: string;
    nextActive: string;
    interval: string;
    estRemainingFood: number;
    estRemainingFeedings: number;
}