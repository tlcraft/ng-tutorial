import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { combineLatestWith, interval, map, take, throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-rxjs-examples',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-examples.component.html',
  styleUrl: './rxjs-examples.component.scss'
})
export class RxjsExamplesComponent {
  numbersInterval = interval(1000);
  takeNumbers$ = this.numbersInterval.pipe(take(10));
  showInterval = false;
  numberList: number[] = [];
  
  showTimeout = false;
  timeoutError: Error;

  showCombineLatest = false;
  combineLatestValue: number;

  expandInterval() {
    this.showInterval = !this.showInterval;
    if (this.showInterval) {
      this.takeNumbers$.subscribe(number => this.numberList.push(number));
    } else {
      this.numberList = [];
    }
  }

  expandTimeout() {
    this.showTimeout = !this.showTimeout;
    if (this.showTimeout) {
      const slow$ = interval(500);
      slow$.pipe(
        timeout({
          each: 400,
          with: () => throwError(() => new Error('Timeout error'))
        })
      )
      .subscribe({
        error: (error) => this.timeoutError = error
      });
    }
  }

  expandCombineLatest() {
    this.showCombineLatest = !this.showCombineLatest;
    if (this.showCombineLatest) {
      const slow$ = interval(800);
      const fast$ = interval(200);
      slow$.pipe(
        combineLatestWith(fast$),
        map(([x, y]) => (this.combineLatestValue = x + y))
      )
      .subscribe();
    }
  }
}
