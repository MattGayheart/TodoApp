import React, { useState } from 'react';
import SubTodo from '../models/subtodo';

import Todo from '../models/todo';

type TodosContextObj = {
    items: Todo[];
    subItems: SubTodo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
    addSubTodo: (text: string, id: string) => void;
    removeSubTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    subItems: [],
    addTodo: () => { },
    removeTodo: (id: string) => { },
    addSubTodo: () => { },
    removeSubTodo: (id: string) => { }
});

const TodosContextProvider: React.FC = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [subTodos, setSubTodos] = useState<SubTodo[]>([]);

    const onAddTodoHandler = (todoText: string) => {
        const newTodo = new Todo(todoText);

        setTodos((prevTodos) => {
            return prevTodos.concat(newTodo);
        });
    };

    const onRemoveTodoHandler = (todoId: string) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== todoId);
        });
    };

    const onAddSubTodoHandler = (subTodoText: string, id: string) => {
        const newSubTodo = new SubTodo(subTodoText, id);

        setSubTodos((prevSubTodos) => {
            return prevSubTodos.concat(newSubTodo);
        });
    };

    const onRemoveSubTodoHandler = (subTodoId: string) => {
        setSubTodos((prevTodos) => {
            return prevTodos.filter(todo => todo.id !== subTodoId);
        });
    };

    const contextValue: TodosContextObj = {
        items: todos,
        subItems: subTodos,
        addTodo: onAddTodoHandler,
        removeTodo: onRemoveTodoHandler,
        addSubTodo: onAddSubTodoHandler,
        removeSubTodo: onRemoveSubTodoHandler
    };

    return (
        <TodosContext.Provider value={contextValue}>
            {props.children}
        </TodosContext.Provider>
    );
}

export default TodosContextProvider;