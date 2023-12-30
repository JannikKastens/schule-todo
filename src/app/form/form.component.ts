import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from '../models/Todo';
import { PriorityChooserComponent } from '../priority-chooser/priority-chooser.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PriorityChooserComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  todoForm = new FormGroup({
    priority: new FormControl(2),
    category: new FormControl(''),
    description: new FormControl(''),
    dueDate: new FormControl('')
  });

  constructor(private todoService: TodoService) { }

  onSubmit() {
    const formValue = this.todoForm.value;
    const dueDate = formValue.dueDate ? new Date(formValue.dueDate) : new Date(); // Handle undefined case
  
    // Get the current todos
    const currentTodos = this.todoService.getTodos();
  
    // Find the highest id among the current todos
    const highestId = currentTodos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0);
  
    // Assign the next integer as the id for the new todo
    const newId = highestId + 1;
  
    const newTodo = new Todo(
      newId,
      formValue.description ?? '', 
      dueDate,
      formValue.category ?? '', 
      formValue.priority ?? 2,
      false
    );
    this.todoService.addTodo(newTodo);
    this.todoForm.reset();
  }

}
