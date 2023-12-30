import { Injectable } from '@angular/core';
import { Todo } from './models/Todo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos = new BehaviorSubject<Todo[]>([]);
  public readonly todos$ = this._todos.asObservable();
  private localStorageKey = 'todos';

  constructor() {
    this.loadTodos();
    if (this._todos.getValue().length === 0) {
      this.initializeTodos();
    }
    console.log('TodoService initialized');
  }

  private initializeTodos() {
    const initialTodos = [
      new Todo(1, 'Sample Todo 1', new Date(), 'Hausarbeit', 1, false),
      new Todo(2, 'Sample Todo 2', new Date(), 'Finanzen', 2, false),
      new Todo(3, 'Sample Todo 3', new Date(), 'Schule', 3, false),
      new Todo(4, 'Sample Todo 3', new Date(), 'Verein', 2, false)
    ];
    this._todos.next(initialTodos);
    this.saveTodos();
  }

  private loadTodos() {
    const storedTodos = localStorage.getItem(this.localStorageKey);
    if (storedTodos) {
      this._todos.next(JSON.parse(storedTodos));
    }
  }

  private saveTodos() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this._todos.getValue()));
  }

  getTodos() {
    return this._todos.getValue();
  }

  addTodo(todo: Todo) {
    const currentTodos = this._todos.getValue();
    currentTodos.push(todo);
    this._todos.next(currentTodos);
    this.saveTodos();
  }

  deleteTodo(id: number) {
    console.log('Deleting todo with id:', id);
    const updatedTodos = this._todos.getValue().filter(todo => {
      const keep = todo.id !== id;
      if (!keep) {
        console.log('Found todo to delete:', todo);
      }
      return keep;
    });
    console.log('Updated todos:', updatedTodos);
    this._todos.next(updatedTodos);
    this.saveTodos();
  }
}