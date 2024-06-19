import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subject, combineLatestWith, concatMap, fromEvent, interval, map, take, takeUntil, throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-rxjs-examples',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-examples.component.html',
  styleUrl: './rxjs-examples.component.scss'
})
export class RxjsExamplesComponent {
  stop$ = new Subject<void>();
  numbersInterval = interval(1000);
  takeNumbers$ = this.numbersInterval.pipe(take(10));
  showInterval = false;
  numberList: number[] = [];
  
  showTimeout = false;
  timeoutError: Error;

  showCombineLatestWith = false;
  combineLatestWithValue: number;

  showConcatMap = false;

  expandInterval() {
    this.showInterval = !this.showInterval;
    if (this.showInterval) {
      this.takeNumbers$.pipe(takeUntil(this.stop$)).subscribe(number => this.numberList.push(number));
    } else {
      this.stop$.next();
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
        }),
        takeUntil(this.stop$)
      )
      .subscribe({
        error: (error) => this.timeoutError = error
      });
    } else {
      this.timeoutError = Error();
      this.stop$.next();
    }
  }

  expandCombineLatestWith() {
    this.showCombineLatestWith = !this.showCombineLatestWith;
    if (this.showCombineLatestWith) {
      const slow$ = interval(800);
      const fast$ = interval(200);

      slow$.pipe(
        combineLatestWith(fast$),
        map(([x, y]) => {
          this.combineLatestWithValue = x + y;
          if (this.combineLatestWithValue > 25) {
            this.stop$.next();
          }
        }),
        takeUntil(this.stop$)
      )
      .subscribe();
    } else {
      this.combineLatestWithValue = 0;
      this.stop$.next();
    }
  }
  
  expandConcatMap() {
    this.showConcatMap = !this.showConcatMap;
    if (this.showConcatMap) {
      const clicks = fromEvent(document, 'click');
      const result = clicks.pipe(
        concatMap(ev => interval(1000).pipe(take(4)))
      );
      result.subscribe(x => console.log(x));
    }
  }
}
