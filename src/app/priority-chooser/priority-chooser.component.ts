import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-priority-chooser',
  standalone: true,
  imports: [],
  templateUrl: './priority-chooser.component.html',
  styleUrl: './priority-chooser.component.css'
})
export class PriorityChooserComponent {
  @Output() prioritySelected = new EventEmitter<number>();

  selectPriority(priority: number) {
    this.prioritySelected.emit(priority);
  }
}
