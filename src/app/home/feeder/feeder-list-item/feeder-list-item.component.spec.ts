import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederListItemComponent } from './feeder-list-item.component';

describe('FeederListItemComponent', () => {
  let component: FeederListItemComponent;
  let fixture: ComponentFixture<FeederListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeederListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeederListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
