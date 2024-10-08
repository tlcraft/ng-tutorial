import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, combineLatestWith, concatMap, debounceTime, filter, fromEvent, generate, interval, map, of, take, takeUntil, tap, throwError, timeout } from 'rxjs';
import { Logger } from '../../services/log.service';
import { ModeService } from '../../services/mode-service';

@Component({
  selector: 'app-rxjs-examples',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rxjs-examples.component.html',
  styleUrl: './rxjs-examples.component.scss'
})
export class RxjsExamplesComponent {
  stop$ = new Subject<void>();

  showInterval = false;
  numberList: number[] = [];
  
  showTimeout = false;
  timeoutError: Error;

  showCombineLatestWith = false;
  combineLatestWithValue: number;

  showConcatMap = false;
  concatNumbers: number[] = [];

  showGenerate = false;
  generatedNumbers: number[] = [];

  showDebounce = false;
  debounceControl = new FormControl();
  debounceValue: string;

  showTap = false;
  tappedValues: number[] = [];
  sourceValues: number[] = [];

  showMapFilter = false;
  mappedValues: number[] = [];

  readonly logger = inject(Logger);
  readonly modeService = inject(ModeService);

  ngOnInit() {
    this.logger.log('Loading the RxJS page.');
    this.logger.log('Mode: ', this.modeService.getMode());
  }

  expandInterval() {
    this.showInterval = !this.showInterval;
    if (this.showInterval) {
      const numbersInterval = interval(1000);
      const takeNumbers$ = numbersInterval.pipe(take(5));
      takeNumbers$.pipe(takeUntil(this.stop$)).subscribe(number => this.numberList.push(number));
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
        concatMap(() => interval(1000).pipe(take(4))),
        takeUntil(this.stop$)
      );
      result.subscribe(x => this.concatNumbers.push(x));
    }
    else {
      this.stop$.next();
      this.concatNumbers = [];
    }
  }

  expandGenerate() {
    this.showGenerate = !this.showGenerate;

    if (this.showGenerate) {
      const result = generate(0, x => x < 5, x => x + 1, x => x);
      result.subscribe(x => this.generatedNumbers.push(x));
    } else {
      this.generatedNumbers = [];
    }
  }

  expandDebounce() {
    this.showDebounce = !this.showDebounce;
    if (this.showDebounce) {
      const result = this.debounceControl.valueChanges.pipe(
        debounceTime(500),
        takeUntil(this.stop$)
      );

      result.subscribe(value => this.debounceValue = value);
    } else {
      this.stop$.next();
      this.debounceValue = '';
    }
  }

  expandTap() {
    this.showTap = !this.showTap;

    if (this.showTap) {
      const source = interval(1000).pipe(take(5));
      source.pipe(
        tap(n => this.tappedValues.push(n * 2)),
        takeUntil(this.stop$)
      ).subscribe(n => this.sourceValues.push(n));
    } else {
      this.stop$.next();
      this.tappedValues = [];
      this.sourceValues = [];
    }
  }

  expandMappedFilter() {
    this.showMapFilter = !this.showMapFilter;

    if (this.showMapFilter) {
      const numbers = of(1, 2, 3, 4, 5);
      const filtered = numbers.pipe(
        map(num => num * 2),
        filter(num => num < 8),
        takeUntil(this.stop$)
      );

      filtered.subscribe(num => this.mappedValues.push(num));
    } else {
      this.mappedValues = [];
    }
  }
}
