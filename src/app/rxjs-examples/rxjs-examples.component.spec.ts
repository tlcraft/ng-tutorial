import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeAll, beforeEach, it } from 'vitest';
import { RxjsExamplesComponent } from './rxjs-examples.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('RxjsExamplesComponent', () => {
  let component: RxjsExamplesComponent;
  let fixture: ComponentFixture<RxjsExamplesComponent>;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsExamplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
