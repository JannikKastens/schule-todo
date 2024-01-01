import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../notification.service';

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

  constructor(private todoService: TodoService, private notificationService: NotificationService) {
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
      this.todoService.setMoveCompletedTodos(value);
    }
  }

  deleteAllTodos() {
    this.todoService.deleteAllTodos();
    this.notificationService.displayNotification('Todos erfolgreich gelöscht', 'success');
  }

  generateTestTodos() {
    this.todoService.initializeTodos();
    this.notificationService.displayNotification('Testdaten erfolgreich generiert', 'success');
  }
}
