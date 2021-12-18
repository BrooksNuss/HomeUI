import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederListComponent } from './feeder-list.component';

describe('FeederListComponent', () => {
  let component: FeederListComponent;
  let fixture: ComponentFixture<FeederListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeederListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeederListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
