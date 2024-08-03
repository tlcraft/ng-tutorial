import { Component, OnInit, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent implements OnInit {
  count: WritableSignal<number>;

  ngOnInit() {
    this.count = signal(0);
  }

  increment() {
    this.count.update(value => ++value);
  }
}
