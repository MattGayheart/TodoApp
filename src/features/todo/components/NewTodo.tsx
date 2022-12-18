import { useRef, useContext } from "react";

import { TodosContext } from "../../../context/todos-context";

import Button from "../../../components/ui/Button";
import Form from "../../../components/ui/Form";

const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext);
    const todoTextInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = todoTextInputRef.current!.value;

        if (enteredText.trim().length === 0) {
            return;
        }

        todosCtx.addTodo(enteredText);
    }

    return (
        <Form onSubmit={submitHandler}>
            <label>Todo text</label>
            <input type="text" id='text' ref={todoTextInputRef} />
            <Button className='btn btn-primary' >Add Todo</Button>
        </Form>
    )
}

export default NewTodo; 