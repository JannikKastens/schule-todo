import { Injectable } from '@angular/core';
import { Todo } from './models/Todo';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private _todos = new BehaviorSubject<Todo[]>([]);
  public readonly todos$ = this._todos.asObservable();
  private showDeleteButton = new BehaviorSubject<boolean>(false);
  private moveCompletedTodos = new BehaviorSubject<boolean>(false);

  private allTodos: Todo[] = [];

  private localStorageKey = 'todos';
  private localStorageSettingsKey = 'settings';


  constructor() {
    this.loadTodos();
    this.allTodos = this._todos.getValue();
    this.loadSettings();
  }

  initializeTodos() {
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
      this.sortTodos();
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
    const updatedTodos = this._todos.getValue().filter(todo => {
      const keep = todo.id !== id;
      return keep;
    });
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
      this.moveCompletedTodos.next(settings.moveCompletedTodos);
    }
  }

  private saveSettings() {
    const settings = {
      showDeleteButton: this.showDeleteButton.getValue(),
      moveCompletedTodos: this.moveCompletedTodos.getValue()
    };
    localStorage.setItem(this.localStorageSettingsKey, JSON.stringify(settings));
  }


  sortTodos() {
    let sortedTodos = [...this._todos.getValue()];
    if (this.moveCompletedTodos.getValue()) {
      sortedTodos.sort((a, b) => Number(a.completed) - Number(b.completed));
    }
    this._todos.next(sortedTodos);
  }

  getMoveCompletedTodos(): Observable<boolean> {
    return this.moveCompletedTodos.asObservable();
  }

  setMoveCompletedTodos(value: boolean) {
    this.moveCompletedTodos.next(value);
    this.saveSettings();
  }

  deleteAllTodos() {
    this._todos.next([]);
    this.saveTodos();
  }
}