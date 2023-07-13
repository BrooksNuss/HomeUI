import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioSandboxComponent } from './audio-sandbox.component';

describe('AudioSandboxComponent', () => {
  let component: AudioSandboxComponent;
  let fixture: ComponentFixture<AudioSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioSandboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
