import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { NavComponent } from './nav/nav.component';
import { Logger } from '../services/log.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, TodoListComponent, NavComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  readonly logger = inject(Logger);

  ngOnInit(): void {
    this.logger.log("Loading the application");
  }
}
