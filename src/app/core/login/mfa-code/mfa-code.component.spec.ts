import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfaCodeComponent } from './mfa-code.component';

describe('MfaCodeComponent', () => {
	let component: MfaCodeComponent;
	let fixture: ComponentFixture<MfaCodeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ MfaCodeComponent ]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(MfaCodeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
