import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Logger } from '../../services/log.service';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent implements OnInit {
  @Input() item: { name: string, id: string };
  @Output() editEmitter: EventEmitter<{ name: string, id: string }> = new EventEmitter();
  @Output() removeEmitter: EventEmitter<{ name: string, id: string }> = new EventEmitter();

  inEditMode: boolean;
  editedItem = new FormControl();

  readonly logger = inject(Logger);

  ngOnInit() {
    this.logger.log('Loading a Todo item.');
    this.editedItem = new FormControl(this.item.name);
  }
  
  removeItem(): void {
    this.removeEmitter.emit();
  }

  editItem(): void {
    this.inEditMode = true;
  }

  saveItem(): void {
    this.inEditMode = false;
    this.editEmitter.emit({ name: this.editedItem.value, id: this.item.id });
  }
}
