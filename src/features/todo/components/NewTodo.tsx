import { useRef, useContext } from "react";

import { TodosContext } from "../../../context/todos-context";

import Button from "../../../components/ui/Button";
import Form from "../../../components/ui/Form";

//Form that contains label, input, and button to submit new todo
const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext);
    const todoTextInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = todoTextInputRef.current!.value;
        todoTextInputRef.current!.value = "";
        if (enteredText.trim().length === 0) {
            return;
        }

         //Passes arguments to Context to update todos state
        todosCtx.addTodo(enteredText);
    }

    return (
        <Form onSubmit={submitHandler}>
            <label>Enter Todo</label>
            <input type="text" id='text' ref={todoTextInputRef} />
            <Button className='btn btn-primary' width="75px" height="35px" >Add</Button>
        </Form>
    )
}

export default NewTodo; 