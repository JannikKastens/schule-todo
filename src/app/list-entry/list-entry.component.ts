import { Component, Input, ChangeDetectorRef, inject } from '@angular/core';
import { Todo } from "../models/Todo";
import { TodoService } from "../todo.service";
import { CommonModule } from '@angular/common';
import { PriorityComponent } from '../priority/priority.component';
import { NotificationService } from '../notification.service';

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
  showDeleteButton?: boolean;
  private todoService = inject(TodoService);

  constructor(private cdr: ChangeDetectorRef, private notificationService: NotificationService) { }

  ngOnInit() {
    this.todoService.getShowDeleteButton().subscribe(value => {
      this.showDeleteButton = value;
    });
  }

  deleteTodo() {
    if (this.todo) {
      this.todoService.deleteTodo(this.todo.id);
      this.notificationService.displayNotification('Todo deleted successfully', 'success');
      this.cdr.detectChanges();
    }
  }

  toggleCompleted() {
    if (this.todo) {
      this.todo.completed = !this.todo.completed;
      this.todoService.updateTodo(this.todo);
      this.todoService.sortTodos();
      this.cdr.detectChanges();
    }
  }

}
