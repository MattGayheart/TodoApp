class SubTodo {
    id: string;
    text: string;
    parentID: string;
    completed: boolean;

    constructor(todoText: string, parentId:string) {
        this.text = todoText;
        this.id = new Date().toISOString();
        this.parentID = parentId;
        this.completed = false;
    }
}

export default SubTodo;