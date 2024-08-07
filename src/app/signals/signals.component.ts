import { Component, OnInit, Signal, WritableSignal, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent implements OnInit {
  count: WritableSignal<number>;
  doubleCount: Signal<number> = computed(() => this.count() * 2);

  constructor() {
    effect((onCleanup) => {
      console.log(`The current count is: ${this.count()}`);

      onCleanup(() => console.log("Effect was cleaned up."));
    });
  }

  ngOnInit() {
    this.count = signal<number>(0);
  }

  increment() {
    this.count.update(value => ++value);
  }
}
