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
  private localStorageSettingsKey = 'settings';
  private allTodos: Todo[] = [];
  private showDeleteButton = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadTodos();
    if (this._todos.getValue().length === 0) {
      this.initializeTodos();
    }
    this.allTodos = this._todos.getValue();
    this.loadSettings();
    console.log('TodoService initialized');
  }

  private initializeTodos() {
    const initialTodos = [
      new Todo(1, 'Sample Todo 1', new Date(), 'Hausarbeit', 1, false),
      new Todo(2, 'Sample Todo 2', new Date(), 'Finanzen', 2, false),
      new Todo(3, 'Sample Todo 3', new Date(), 'Schule', 3, false),
      new Todo(4, 'Sample Todo 4', new Date(), 'Verein', 2, false)
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

  updateTodo(updatedTodo: Todo) {
    const currentTodos = this._todos.getValue();
    const todoIndex = currentTodos.findIndex(todo => todo.id === updatedTodo.id);
    if (todoIndex !== -1) {
      currentTodos[todoIndex] = updatedTodo;
      this._todos.next(currentTodos);
      this.saveTodos();
    }
  }

  filterTodos(category: string) {
    if (category === 'Alle') {
      this._todos.next(this.allTodos);
    } else {
      const filteredTodos = this.allTodos.filter(todo => todo.category === category);
      this._todos.next(filteredTodos);
    }
  }

  searchTodos(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredTodos = this.allTodos.filter(todo =>
      todo.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      todo.dueDate.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
      todo.category.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this._todos.next(filteredTodos);
  }

  getShowDeleteButton() {
    return this.showDeleteButton.asObservable();
  }

  setShowDeleteButton(value: boolean) {
    this.showDeleteButton.next(value);
    this.saveSettings();
  }

  private loadSettings() {
    const storedSettings = localStorage.getItem(this.localStorageSettingsKey);
    if (storedSettings) {
      const settings = JSON.parse(storedSettings);
      this.showDeleteButton.next(settings.showDeleteButton);
    }
  }

  private saveSettings() {
    const settings = {
      showDeleteButton: this.showDeleteButton.getValue()
    };
    localStorage.setItem(this.localStorageSettingsKey, JSON.stringify(settings));
  }
}