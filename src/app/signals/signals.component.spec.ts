import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it } from 'vitest';
import { SignalsComponent } from './signals.component';

describe('SignalsComponent', () => {
  let component: SignalsComponent;
  let fixture: ComponentFixture<SignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignalsComponent);
    component = fixture.componentInstance;
    const componentRef = fixture.componentRef;
    componentRef.setInput('firstName', 'first');
    componentRef.setInput('lastName', 'last');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
