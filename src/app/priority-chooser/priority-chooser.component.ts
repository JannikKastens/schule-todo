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
  selectedPriority?: number;

  selectPriority(priority: number) {
    this.selectedPriority = priority;
    this.prioritySelected.emit(priority);
  }

  isSelected(priority: number): boolean {
    return this.selectedPriority === priority;
  }
}
