import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from '../models/Todo';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  todoForm = new FormGroup({
    priority: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl(''),
    dueDate: new FormControl(''),
    done: new FormControl('')
  });

  constructor(private todoService: TodoService) { }

  onSubmit() {
    const formValue = this.todoForm.value;
    const dueDate = formValue.dueDate ? new Date(formValue.dueDate) : new Date(); // Handle undefined case
    const newTodo = new Todo(
      Date.now(), // use the current timestamp as a unique id
      formValue.description ?? '', 
      dueDate,
      formValue.category ?? '', 
      parseInt(formValue.priority ?? '0') 
    );
    this.todoService.addTodo(newTodo);
    this.todoForm.reset();
  }

}
