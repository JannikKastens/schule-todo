import { Component } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  selectedCategory = 'Alle';

  constructor(private todoService: TodoService) {}

  filterTodos(category: string) {
    this.selectedCategory = category;
    this.todoService.filterTodos(category);
  }
}
