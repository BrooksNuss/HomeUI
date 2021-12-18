import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederDetailComponent } from './feeder-detail.component';

describe('FeederDetailComponent', () => {
  let component: FeederDetailComponent;
  let fixture: ComponentFixture<FeederDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeederDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeederDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
