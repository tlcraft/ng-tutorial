import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  const mockItem = { 
    id: "1234abc",
    name: "item"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.item = mockItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.item.id).toBe('1234abc');
    expect(component.item.name).toBe('item');
    expect(component.inEditMode).toBeUndefined();
  });

  it('should emit removed', () => {
    spyOn(component.removeEmitter, 'emit');
    component.removeItem();
    expect(component.removeEmitter.emit).toHaveBeenCalled();
  });
});
