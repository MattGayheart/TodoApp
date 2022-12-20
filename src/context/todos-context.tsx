import React, { useState } from "react";
import SubTodo from "../models/subtodo";

import Todo from "../models/todo";

type TodosContextObj = {
  items: Todo[];
  subItems: SubTodo[];
  addTodo: (text: string) => void;
  updateTodo: (id: string, type: string, value: string) => void;
  updateSubTodo: (id: string, type: string, value: boolean) => void;
  removeTodo: (id: string) => void;
  addSubTodo: (text: string, id: string) => void;
  removeSubTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  subItems: [],
  addTodo: () => {},
  updateTodo: (id: string, type: string, value: string) => {},
  updateSubTodo: (id: string, type: string, value: boolean) => {},
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
        if(type === 'isComplete') {
          let convertedValue = value === 'true' ? true : false;
          newTodo[i].completed = convertedValue;
          break;
        }
      }
    }
    if(type === 'isComplete' && value == 'true') {
      const newSubTodo = [...subTodos];
      for(let i =0; i < newSubTodo.length; i++) {
        if(newSubTodo[i].parentID === id) {
          updateSubTodo(newSubTodo[i].id, type, true);
        }
      }
    } else if (type === 'isComplete' && value == 'false') {
      
      if(window.confirm('Would you like to uncheck all sub todos too?')) {
        const newSubtodo = [...subTodos];
        for(let i =0; i < newSubtodo.length; i++) {
          if(newSubtodo[i].parentID === id) {
            updateSubTodo(newSubtodo[i].id, type, false);
          }
        }
      }
    }
    setTodos(newTodo);
  };

  const updateSubTodo = (id: string, type: string, value: boolean) => {
    const newSubTodo = [...subTodos];
    for(let i = 0; i < newSubTodo.length; i++) {
      if(newSubTodo[i].id === id) {
        if(type === 'isComplete') {
          newSubTodo[i].completed = value;
        }
      }
    }
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
    updateSubTodo: updateSubTodo,
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
