import React, { useContext } from "react";
import classes from "../styles/Todos.module.css";

import { TodosContext } from "../../../context/todos-context";

import TodoItem from "./TodoItem";

//Component that maps all todos into a TodoItem component
const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  const tasks = todosCtx.items;
  const subTasks = todosCtx.subItems;

  return (
    <div className={classes.todos}>
      {tasks.map((item) => (
        <TodoItem
          onRemoveSubTodo={todosCtx.removeSubTodo}
          key={item.id}
          id={item.id}
          isComplete={item.completed}
          text={item.text}
          dueDate={item.dueDate}
            subItem={subTasks}
          moreDetails={item.moreDetails}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </div>
  );
};

export default Todos;
