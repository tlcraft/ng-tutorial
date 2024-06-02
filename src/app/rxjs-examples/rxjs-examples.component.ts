import { Component, OnInit } from '@angular/core';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-rxjs-examples',
  standalone: true,
  imports: [],
  templateUrl: './rxjs-examples.component.html',
  styleUrl: './rxjs-examples.component.scss'
})
export class RxjsExamplesComponent implements OnInit {
  numbers = interval(1000);
  takeFourNumbers = this.numbers.pipe(take(4));

  ngOnInit() {
     this.takeFourNumbers.subscribe(x => console.log('Next: ', x));
  }
}
