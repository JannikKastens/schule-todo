import {Component, Input} from '@angular/core';
import {Todo} from "../models/Todo";

@Component({
  selector: 'app-list-entry',
  standalone: true,
  imports: [],
  templateUrl: './list-entry.component.html',
  styleUrl: './list-entry.component.css'
})
export class ListEntryComponent {
  @Input() todo?: Todo;

}
