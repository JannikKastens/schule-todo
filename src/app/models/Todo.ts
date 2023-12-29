export class Todo {
  id: number;
  description: string;
  dueDate: Date;
  category: string;
  priority: number;

  constructor(id: number, description: string, dueDate: Date, category: string, priority: number) {
    this.id = id;
    this.description = description;
    this.dueDate = dueDate;
    this.category = category;
    this.priority = priority;
  }
}
