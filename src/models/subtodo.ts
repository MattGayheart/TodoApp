class SubTodo {
  id: number;
  text: string;
  parentID: number;
  completed: boolean;

  constructor(todoText: string, parentId: number) {
    this.text = todoText;
    this.id = 0;
    this.parentID = parentId;
    this.completed = false;
  }
}

export default SubTodo;
