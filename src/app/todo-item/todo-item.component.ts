import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss'
})
export class TodoItemComponent {
  @Input() item: { name: string, id: string };
  @Output() removeEmitter: EventEmitter<any> = new EventEmitter();

  removeItem(id: string): void {
    this.removeEmitter.emit();
  }

  editItem(id: string): void {
    console.log("Edit: ", id);
  }
}
