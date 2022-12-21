class Todo {
  id: number;
  text: string;
  moreDetails: string;
  dueDate: string;
  completed: boolean;

  constructor(todoText: string) {
    this.text = todoText;
    this.moreDetails = "";
    this.dueDate = new Date().toLocaleDateString();
    this.id = 0;
    this.completed = false;
  }
}

export default Todo;
