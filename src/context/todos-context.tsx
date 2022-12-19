import React, { useState } from "react";
import SubTodo from "../models/subtodo";

import Todo from "../models/todo";

type TodosContextObj = {
  items: Todo[];
  subItems: SubTodo[];
  addTodo: (text: string) => void;
  updateTodo: (id: string, type: string, value: string) => void;
  removeTodo: (id: string) => void;
  addSubTodo: (text: string, id: string) => void;
  removeSubTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  subItems: [],
  addTodo: () => {},
  updateTodo: (id: string, type: string, value: string) => {},
  removeTodo: (id: string) => {},
  addSubTodo: () => {},
  removeSubTodo: (id: string) => {},
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

  const updateTodoDetails = (id: string, type: string, value: string) => {
    const newTodo = [...todos];
    
    for(let i = 0; i < newTodo.length; i++) {
      if(newTodo[i].id === id) {
        if(type === 'moreDetails') {
          newTodo[i].moreDetails = value;
          break;
        }
        if(type === 'dueDate') {
          const newDate = new Date(value);
          newTodo[i].dueDate = newDate.toLocaleDateString();
          break;
        }
      }
    }
    setTodos(newTodo);
  };

  const onRemoveTodoHandler = (todoId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== todoId);
      });
    }
  };

  const onAddSubTodoHandler = (subTodoText: string, id: string) => {
    const newSubTodo = new SubTodo(subTodoText, id);

    setSubTodos((prevSubTodos) => {
      return prevSubTodos.concat(newSubTodo);
    });
  };

  const onRemoveSubTodoHandler = (subTodoId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setSubTodos((prevTodos) => {
        return prevTodos.filter((todo) => todo.id !== subTodoId);
      });
    }
  };

  const contextValue: TodosContextObj = {
    items: todos,
    subItems: subTodos,
    addTodo: onAddTodoHandler,
    updateTodo: updateTodoDetails,
    removeTodo: onRemoveTodoHandler,
    addSubTodo: onAddSubTodoHandler,
    removeSubTodo: onRemoveSubTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
