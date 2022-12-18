import SubTodo from "./subtodo";

class Todo {
    id: string;
    text: string;
    moreDetails: string;
    dueDate: string;
    completed: boolean;

    constructor(todoText: string) {
        this.text = todoText;
        this.moreDetails = "";
        this.dueDate = new Date().toLocaleDateString();
        this.id = new Date().toISOString();
        this.completed = false;
    }
}

export default Todo;