import { useRef, useContext } from "react";

import { TodosContext } from "../../../context/todos-context";

import Button from "../../../components/ui/Button";
import Form from "../../../components/ui/Form";

const NewSubTodo: React.FC<{parentid: string}> = (props) => {
    const todosCtx = useContext(TodosContext);
    const todoTextInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = todoTextInputRef.current!.value;
        todoTextInputRef.current!.value = "";
        if (enteredText.trim().length === 0) {
            return;
        }

        todosCtx.addSubTodo(enteredText, props.parentid);
    }

    return (
        <Form onSubmit={submitHandler}>
            <label>Enter Sub Todo</label>
            <input type="text" id='text' ref={todoTextInputRef} />
            <Button className='btn btn-primary' width="75px" height="35px" >Add</Button>
        </Form>
    )
}

export default NewSubTodo; 