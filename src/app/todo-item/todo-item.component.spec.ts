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

  it('should enable edit', () => {
    expect(component.inEditMode).toBeUndefined();
    component.editItem();
    expect(component.inEditMode).toBeTrue();
  });

  it('should save the item', () => {
    spyOn(component.editEmitter, 'emit');
    expect(component.inEditMode).toBeUndefined();
    expect(component.editedItem.value).toBe('item');
    
    component.editItem();
    expect(component.inEditMode).toBeTrue();

    component.editedItem.setValue('edited item');
    component.saveItem();

    expect(component.editedItem.value).toBe('edited item');
    expect(component.inEditMode).toBeFalse();
    expect(component.editEmitter.emit).toHaveBeenCalled();
  });
});
