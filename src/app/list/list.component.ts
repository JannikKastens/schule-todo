import { Component } from '@angular/core';
import {ListEntryComponent} from "../list-entry/list-entry.component";
import {Todo} from "../models/Todo";
import {TodoService} from "../todo.service";
import {NgComponentOutlet, NgForOf} from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    ListEntryComponent,
    NgForOf,
    NgComponentOutlet
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {
    this.todos = todoService.getTodos();
  }

  protected readonly ListEntryComponent = ListEntryComponent;
}
