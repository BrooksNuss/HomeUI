import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SidebarService {
	private expanded$ = new BehaviorSubject(false);
	public expanded = this.expanded$.asObservable();

	toggleSidebar(): void {
		this.expanded$.next(!this.expanded$.value);
	}
}
