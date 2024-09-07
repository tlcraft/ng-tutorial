import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { Logger } from '../../services/log.service';
import { ModeService } from '../../services/mode-service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {
  todoList: { name: string, id: string }[] = [];
  newItem = new FormControl('');
  logger = inject(Logger);
  modeService = inject(ModeService);

  ngOnInit(): void {
    this.logger.log('Loading the Todo page.');
  }

  addItem(): void {
    const newItem = this.newItem.value;

    if (newItem) {
      this.todoList.push({ name: newItem, id: uuidv4() });
    }
  }

  editItem(editedItem: { name: string, id: string }): void {
    this.todoList = this.todoList.map(item => item.id === editedItem.id ? editedItem : item);
  }

  removeItem(id: string): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
  }

  toggleMode() {
    this.modeService.setMode(!this.modeService.getMode());
    this.logger.log('Mode: ', this.modeService.getMode());
  }
}
