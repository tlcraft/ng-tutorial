import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-rxjs-examples',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rxjs-examples.component.html',
  styleUrl: './rxjs-examples.component.scss'
})
export class RxjsExamplesComponent {
  numbersInterval = interval(1000);
  takeFourNumbers$ = this.numbersInterval.pipe(take(4));
  showInterval = false;
  numberList: number[] = [];

  expandInterval() {
    this.showInterval = !this.showInterval;
    if (this.showInterval) {
      this.takeFourNumbers$.subscribe(number => this.numberList.push(number));
    } else {
      this.numberList = [];
    }
  }
}
