import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeederInfo } from '../models/FeederInfo';

@Injectable({
	providedIn: 'root'
})
export class FeederService {

	constructor(private httpClient: HttpClient) { }

	getFeederList(): Observable<FeederInfo[]> {
		return this.httpClient.get<FeederInfo[]>(environment.feederGateway + 'list-info');
	}

	activateFeeder(id: string): Observable<FeederInfo> {
		return this.httpClient.post<FeederInfo>(environment.feederGateway + 'activate/' + id, {});
	}

	skipNextFeeding(id: string): Observable<FeederInfo> {
		return this.httpClient.post<FeederInfo>(environment.feederGateway + 'skip/' + id, {});
	}

	toggleEnabled(id: string): Observable<FeederInfo> {
		return this.httpClient.post<FeederInfo>(environment.feederGateway + 'toggle-enabled/' + id, {});
	}
}
