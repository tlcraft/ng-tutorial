import { Component, OnInit, Signal, WritableSignal, computed, effect, inject, input, signal } from '@angular/core';
import { Logger } from '../../services/log.service';

@Component({
  selector: 'app-signals',
  standalone: true,
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent implements OnInit {
  firstName = input.required();
  lastName = input.required();

  count: WritableSignal<number>;
  doubleCount: Signal<number> = computed(() => this.count() * 2);
  fullName: Signal<string> = computed(() => `${this.firstName()} ${this.lastName()}`)

  logger = inject(Logger);

  constructor() {
    effect((onCleanup) => {
      console.log(`The current count is: ${this.count()}`);

      onCleanup(() => console.log("Effect was cleaned up."));
    });
  }

  ngOnInit() {
    this.count = signal<number>(0);
    this.logger.log('Loading the Signals page.');
  }

  increment() {
    this.count.update(value => ++value);
  }
}
