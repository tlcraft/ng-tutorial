import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todoList: string[] = [];
  newItem = new FormControl('');

  addItem(): void {
    const newItem = this.newItem.value;
    if (newItem) {
      this.todoList.push(newItem);
    }
  }
}
