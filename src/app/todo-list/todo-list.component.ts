import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  todoList: { name: string, id: string }[] = [];
  newItem = new FormControl('');

  addItem(): void {
    const newItem = this.newItem.value;

    if (newItem) {
      this.todoList.push({ name: newItem, id: uuidv4() });
    }
  }

  removeItem(id: string): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
  }
}
