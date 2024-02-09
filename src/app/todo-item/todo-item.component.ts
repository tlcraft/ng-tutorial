import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit {
  @Input() item: { name: string, id: string };
  @Output() editEmitter: EventEmitter<any> = new EventEmitter();
  @Output() removeEmitter: EventEmitter<any> = new EventEmitter();

  inEditMode: boolean;
  editedItem = new FormControl();

  ngOnInit() {
    this.editedItem = new FormControl(this.item.name);
  }
  
  removeItem(): void {
    this.removeEmitter.emit();
  }

  editItem(id: string): void {
    this.inEditMode = true;
  }

  saveItem(): void {
    this.inEditMode = false;
    this.editEmitter.emit({ name: this.editedItem.value, id: this.item.id });
  }
}
