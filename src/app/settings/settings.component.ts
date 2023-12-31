import { Component, inject } from '@angular/core';
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
  private todoService = inject(TodoService);

  constructor() {
    this.todoService.getShowDeleteButton().subscribe(value => {
      this.showDeleteButton = value;
    });
  }

  updateShowDeleteButton(value: boolean | Event) { // Update the parameter type to handle Event
    if (typeof value === 'boolean') {
      console.log('Updating showDeleteButton in TodoService:', value);
      this.todoService.setShowDeleteButton(value);
    }
  }

}
