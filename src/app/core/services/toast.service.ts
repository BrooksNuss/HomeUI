import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	constructor(private snackbarService: MatSnackBar) { }

	showToastMessage(text: string, action: string | undefined, duration: number) {
		this.snackbarService.open(text, action, {duration});
	}
}
