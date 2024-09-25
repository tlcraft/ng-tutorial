import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeAll, beforeEach, it } from 'vitest';
import { TodoListComponent } from './todo-list.component';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.newItem.value).toBe('');
    expect(component.todoList).toEqual([]);
  });

  it('should add an item', () => {
    expect(component.todoList.length).toBe(0);
    
    component.newItem.setValue('Test Item');
    component.addItem();
    
    expect(component.todoList.length).toBe(1);
    expect(component.todoList[0].name).toBe('Test Item');
  });

  it('should remove an item', () => {
    component.todoList.push({ id: 'abc123', name: 'Test Item' });
    expect(component.todoList.length).toBe(1);

    component.removeItem('abc123');
    
    expect(component.todoList.length).toBe(0);
  });

  it('should edit an item', () => {
    component.todoList.push({ id: 'abc123', name: 'Test Item' });
    expect(component.todoList.length).toBe(1);

    component.editItem({ id: 'abc123', name: 'Edited Item' });
    
    expect(component.todoList.length).toBe(1);
    expect(component.todoList[0].id).toBe('abc123');
    expect(component.todoList[0].name).toBe('Edited Item');
  });
});
