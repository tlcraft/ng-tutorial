import { Component, OnInit, Signal, WritableSignal, computed, effect, inject, input, signal } from '@angular/core';
import { Logger } from '../../services/log.service';

@Component({
  selector: 'app-signals',
  standalone: true,
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent implements OnInit {
  firstName = input.required<string>();
  lastName = input.required<string>();

  count: WritableSignal<number>;
  anotherCount: WritableSignal<number>;
  doubleCount: Signal<number> = computed(() => this.count() * 2);
  fullName: Signal<string> = computed(() => `${this.firstName()} ${this.lastName()}`);

  logger = inject(Logger);

  constructor() {
    effect((onCleanup) => {
      console.log(`The current count is: ${this.count()}`);

      onCleanup(() => console.log("Effect was cleaned up."));
    });

     effect(() => {
      console.log(`The current other count is: ${this.anotherCount()}`);
    });
  }

  ngOnInit() {
    this.count = signal<number>(0);
    this.anotherCount = signal<number>(0);
    this.logger.log('Loading the Signals page.');
  }

  increment() {
    this.count.update(this.add);
  }

  incrementAnotherCount() {
    this.anotherCount.update(this.add);
    console.log('Another count: ', this.anotherCount());
  }

  add(value: number): number {
    return ++value;
  }

}
