import React, { useContext } from "react";
import classes from '../styles/Todos.module.css';

import { TodosContext } from "../../../context/todos-context";

import TodoItem from "./TodoItem";

const Todos: React.FC = () => {
    const todosCtx = useContext(TodosContext);

    return (
        <div className={classes.todos}>
            {todosCtx.items.map((item) => (
                <TodoItem key={item.id} text={item.text} onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)} />
            ))}
        </div>
    );
}

export default Todos;