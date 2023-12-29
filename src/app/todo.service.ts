import { Injectable } from '@angular/core';
import { Todo } from './models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [];
  private localStorageKey = 'todos';

  constructor() {
    this.loadTodos();
    if (this.todos.length === 0) {
      this.initializeTodos();
    }
  }

  private initializeTodos() {
    this.todos = [
      new Todo(1, 'Sample Todo 1', new Date(), 'Category 1', 1),
      new Todo(2, 'Sample Todo 2', new Date(), 'Category 2', 2),
      new Todo(3, 'Sample Todo 3', new Date(), 'Category 3', 3)
    ];
    this.saveTodos();
  }

  private loadTodos() {
    const storedTodos = localStorage.getItem(this.localStorageKey);
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  private saveTodos() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.todos));
  }

  getTodos() {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.saveTodos();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }
}
