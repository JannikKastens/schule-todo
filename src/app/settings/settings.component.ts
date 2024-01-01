import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  showDeleteButton?: boolean;
  moveCompletedTodos?: boolean;

  constructor(private todoService: TodoService) {
    this.todoService.getShowDeleteButton().subscribe(value => {
      this.showDeleteButton = value;
    });
    this.todoService.getMoveCompletedTodos().subscribe(value => {
      this.moveCompletedTodos = value;
    });
  }

  updateShowDeleteButton(value: boolean) {
    this.todoService.setShowDeleteButton(value);
  }

  sortTodos(value: boolean) {
    if (typeof value === 'boolean') {
      console.log('Updating moveCompletedTodos in TodoService:', value);
      this.todoService.setMoveCompletedTodos(value);
    }
  }

  deleteAllTodos() {
    this.todoService.deleteAllTodos();
  }

  generateTestTodos() {
    this.todoService.initializeTodos();
  }
}
