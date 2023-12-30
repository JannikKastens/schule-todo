import { Component, Input } from '@angular/core';
import { Todo } from '../models/Todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-priority',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.css'
})
export class PriorityComponent {
  @Input() priority?: number;

  getIconClass() {
    switch (this.priority) {
      case 3:
        return 'bi-caret-up-fill';
      case 2:
        return 'bi-circle-fill';
      case 1:
        return 'bi-caret-down-fill';
      default:
        return '';
    }
  }
}
