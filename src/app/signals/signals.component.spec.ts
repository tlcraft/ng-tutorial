import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeAll, beforeEach, it } from 'vitest';
import { SignalsComponent } from './signals.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('SignalsComponent', () => {
  let component: SignalsComponent;
  let fixture: ComponentFixture<SignalsComponent>;
  
  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
