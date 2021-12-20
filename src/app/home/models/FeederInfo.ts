export interface FeederInfo {
    name: string;
    status: 'ACTIVE' | 'INACTIVE';
    lastActive: number;
    nextActive: number;
    interval: number;
    estRemainingFood: number;
    estRemainingFeedings: number;
}