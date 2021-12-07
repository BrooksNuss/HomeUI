import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfaQrComponent } from './mfa-qr.component';

describe('MfaQrComponent', () => {
	let component: MfaQrComponent;
	let fixture: ComponentFixture<MfaQrComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ MfaQrComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MfaQrComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
