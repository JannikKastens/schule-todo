export class Todo {
  constructor(
    public id: number,
    public description: string,
    public dueDate: Date,
    public category: string,
    public priority: number,
    public completed: boolean
  ) { }
}
