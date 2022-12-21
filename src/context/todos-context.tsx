import React, { useState, useEffect } from "react";
import useHttp from "../hooks/use-http";
import SubTodo from "../models/subtodo";
import Todo from "../models/todo";
import endpoints from "../api/endpoints";

//Creates typescript ContextType to avoid DRY code.
type TodosContextObj = {
  items: Todo[];
  subItems: SubTodo[];
  addTodo: (text: string) => void;
  addSubTodo: (text: string, id: number) => void;
  updateTodo: (
    id: number,
    type: string,
    value: string,
    referrer: string
  ) => void;
  updateSubTodo: (id: number, type: string, value: boolean) => void;
  removeTodo: (id: number) => void;
  removeSubTodo: (id: number) => void;
};

//Creates typescript type to avoid DRY code
type todoTaskObj = {
  id: number;
  text: string;
  moreDetails: string;
  dueDate: string;
  completed: boolean;
};

//Creates typescript type to avoid DRY code
type subTodoTaskObj = {
  id: number;
  text: string;
  parentID: number;
  completed: boolean;
};

// Creates context for functions to be reused throughout project
export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  subItems: [],
  addTodo: () => {},
  addSubTodo: () => {},
  updateTodo: (id: number, type: string, value: string, referrer: string) => {},
  updateSubTodo: (id: number, type: string, value: boolean) => {},
  removeTodo: (id: number) => {},
  removeSubTodo: (id: number) => {},
});

//Main component that sets initial states
const TodosContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [subTodos, setSubTodos] = useState<SubTodo[]>([]);
  //Custom hook to clean up fetches for API
  const { sendRequest } = useHttp();

  useEffect(() => {
    //Uses use-http hook to GET todo
    sendRequest(
      {
        url: endpoints.todo,
      },
      getTodos
    );

    //Uses use-http hook to GET subtodo
    sendRequest(
      {
        url: endpoints.subtodo,
      },
      getSubTodos
    );
  }, [sendRequest]);

  //Fetches a list of todo objects and sets state
  const getTodos = (taskObj: [todoTaskObj]) => {
    const loadedTodos: Todo[] = [];

    for (const taskKey in taskObj) {
      loadedTodos.push({
        id: taskObj[taskKey].id,
        text: taskObj[taskKey].text,
        moreDetails: taskObj[taskKey].moreDetails,
        dueDate: taskObj[taskKey].dueDate,
        completed: taskObj[taskKey].completed,
      });
    }

    setTodos(loadedTodos);
  };

  //Fetches a list of subtodo objects and sets state
  const getSubTodos = (taskObj: [subTodoTaskObj]) => {
    const loadedSubTodos: SubTodo[] = [];

    for (const taskKey in taskObj) {
      loadedSubTodos.push({
        id: taskObj[taskKey].id,
        text: taskObj[taskKey].text,
        parentID: taskObj[taskKey].parentID,
        completed: taskObj[taskKey].completed,
      });
    }

    setSubTodos(loadedSubTodos);
  };

  //Appends to todos state to add a todo
  const onAddTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);
    const addTodo = (taskObj: [todoTaskObj]) => {
      setTodos((prevTodos) => {
        return prevTodos.concat(taskObj);
      });
    };

    //Uses use-http hook to POST data
    sendRequest(
      {
        url: endpoints.todo,
        method: "POST",
        body: newTodo,
        headers: {
          "content-type": "application/json",
        },
      },
      addTodo
    );
  };

  //Updates a todo as user fills out the form
  const updateTodoDetails = (
    id: number,
    type: string,
    value: string,
    referrer: string
  ) => {
    const newTodo = [...todos];
    let todoItem: Todo = new Todo("");

    //Loops through to set value of todoItem to sent to API call
    for (let i = 0; i < newTodo.length; i++) {
      if (newTodo[i].id === id) {
        todoItem = newTodo[i];
        //Updates todoItem if "More Details" section blurs
        if (type === "moreDetails") {
          todoItem.moreDetails = value;
          break;
        }
        //Updates todoItem if "Date" section changes
        if (type === "dueDate") {
          const newDate = new Date(value).toISOString();
          let getDate = newDate.slice(0, 10).split("-"); 
          var date = getDate[1] + "/" + getDate[2] + "/" + getDate[0];
          todoItem.dueDate = date;
          break;
        }
        //Updates todoItem if main todo is checked
        if (type === "isComplete") {
          let convertedValue = value === "true" ? true : false;
          todoItem.completed = convertedValue;
          break;
        }
      }
    }
    //Completes all subtodos if main todo is checked off
    if (type === "isComplete" && value === "true") {
      const newSubTodo = [...subTodos];
      for (let i = 0; i < newSubTodo.length; i++) {
        if (newSubTodo[i].parentID === id) {
          updateSubTodo(newSubTodo[i].id, type, true);
        }
      }
    } else if (
      type === "isComplete" &&
      value === "false" &&
      referrer === "task"
    ) {
      //Prompts to uncheck all todos if main todo is unchecked
      if (window.confirm("Would you like to uncheck all sub todos too?")) {
        const newSubtodo = [...subTodos];
        for (let i = 0; i < newSubtodo.length; i++) {
          if (newSubtodo[i].parentID === id) {
            updateSubTodo(newSubtodo[i].id, type, false);
          }
        }
      }
    }

    const updateTodos = (taskObj: [todoTaskObj]) => {
      setTodos(taskObj);
    };

    //Uses use-http hook to PUT todo using todoItem
    sendRequest(
      {
        url: `${endpoints.todo}/${id}`,
        method: "PUT",
        body: todoItem,
        headers: {
          "content-type": "application/json",
        },
      },
      updateTodos
    );
  };

  //Updates subTodo state
  const updateSubTodo = (id: number, type: string, value: boolean) => {
    const newSubTodo = [...subTodos];
    let subTodoItem: SubTodo = new SubTodo("", id);
    for (let i = 0; i < newSubTodo.length; i++) {
      if (newSubTodo[i].id === id) {
        subTodoItem = newSubTodo[i];
        if (type === "isComplete") {
          subTodoItem.completed = value;
        }
      }
    }
    const updateSubTodos = (taskObj: [subTodoTaskObj]) => {
      setSubTodos(taskObj);
    };

    //Uses use-http hook to PUT subtodo
    sendRequest(
      {
        url: `${endpoints.subtodo}/${id}`,
        method: "PUT",
        body: subTodoItem,
        headers: {
          "content-type": "application/json",
        },
      },
      updateSubTodos
    );
  };

  //Deletes a todo with given id
  const onRemoveTodoHandler = (todoId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const deleteTodo = (taskObj: todoTaskObj) => {
        setTodos((prevTodos) => {
          return prevTodos.filter((todo) => todo.id !== taskObj.id);
        });
      };

      //Uses use-http hook to DELETE todo
      sendRequest(
        {
          url: `${endpoints.todo}/${todoId}`,
          method: "DELETE",
        },
        deleteTodo
      );
    }
  };

  //
  const onAddSubTodoHandler = (subTodoText: string, id: number) => {
    const newSubTodo = new SubTodo(subTodoText, id);

    const addSubTodo = (taskObj: [subTodoTaskObj]) => {
      setSubTodos((prevSubTodos) => {
        return prevSubTodos.concat(taskObj);
      });
    };

    //Uses use-http hook to POST subTodo
    sendRequest(
      {
        url: endpoints.subtodo,
        method: "POST",
        body: newSubTodo,
        headers: {
          "content-type": "application/json",
        },
      },
      addSubTodo
    );
  };

  //Deletes subtodo given an id
  const onRemoveSubTodoHandler = (subTodoId: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const deleteSubTodo = (taskObj: subTodoTaskObj) => {
        setSubTodos((prevSubTodos) => {
          return prevSubTodos.filter((todo) => todo.id !== taskObj.id);
        });
      };

      sendRequest(
        {
          url: `${endpoints.subtodo}/${subTodoId}`,
          method: "DELETE",
        },
        deleteSubTodo
      );
    }
  };

  //Creates a contextValue for returning the context provider
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
