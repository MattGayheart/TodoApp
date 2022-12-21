import TodosContextProvider from "../context/todos-context";
import NewTodo from "../features/todo/components/NewTodo";
import Todos from "../features/todo/components/Todos";

function TodoPage() {
  return (
    <TodosContextProvider>
      <NewTodo />
      <Todos />
    </TodosContextProvider>
  );
}

export default TodoPage;
