class SubTodo {
    id: string;
    text: string;
    parentID: string;

    constructor(todoText: string, parentId:string) {
        this.text = todoText;
        this.id = new Date().toISOString();
        this.parentID = parentId;
    }
}

export default SubTodo;