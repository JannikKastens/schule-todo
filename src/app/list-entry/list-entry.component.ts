import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Todo } from "../models/Todo";
import { TodoService } from "../todo.service";
import { CommonModule } from '@angular/common';
import { PriorityComponent } from '../priority/priority.component';

@Component({
  selector: '[app-list-entry]',
  standalone: true,
  imports: [
    CommonModule,
    PriorityComponent
  ],
  templateUrl: './list-entry.component.html',
  styleUrl: './list-entry.component.css'
})
export class ListEntryComponent {
  @Input() todo?: Todo;

  constructor(private todoService: TodoService, private cdr: ChangeDetectorRef) { }

  deleteTodo() {
    if (this.todo) {
      this.todoService.deleteTodo(this.todo.id);
      this.cdr.detectChanges();
    }
  }

  toggleCompleted() {
    if (this.todo) {
      this.todo.completed = !this.todo.completed;
      this.todoService.updateTodo(this.todo);
    }
  }

}
