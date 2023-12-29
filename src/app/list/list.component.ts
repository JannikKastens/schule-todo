import { Component } from '@angular/core';
import {Todo} from "../models/Todo";
import {TodoService} from "../todo.service";
import {NgComponentOutlet, NgForOf} from "@angular/common";
import {ListEntryComponent} from "../list-entry/list-entry.component";
import { Subscription } from 'rxjs';

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
  private subscription: Subscription = new Subscription();

  constructor(private todoService: TodoService) {
    this.todos = todoService.getTodos();
    console.log('ListComponent initialized');
  }

  ngOnInit() {
    this.subscription = this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
