import React, { useState, useContext } from "react";
import { TodosContext } from "../../../context/todos-context";
import Card from "../../../components/ui/Card";
import TodoDetails from "./TodoDetails";
import SubTodo from "../../../models/subtodo";
import classes from "../styles/TodoItem.module.css";
import { RiEditBoxLine, RiDeleteBin7Line } from "react-icons/ri";

//Component contains each todo item
const TodoItem: React.FC<{
  id: number;
  text: string;
  moreDetails: string;
  dueDate: string;
  subItem: SubTodo[];
  isComplete: boolean;
  onRemoveSubTodo: (id: number) => void;
  onRemoveTodo: () => void;
}> = (props) => {
  //Controls modal to drill into a todo
  const [showModal, setShowModal] = useState(false);
  //Creates context to update state
  const todosCtx = useContext(TodosContext);

  const onShowModalHandler = () => {
    setShowModal(true);
  };

  const onHideModalHandler = () => {
    setShowModal(false);
  };

  //Gets id that matches parent and child tasks
  const itemSubTasks = props.subItem.filter((item) => {
    return item.parentID === props.id;
  });

  //Grabs a count of completed subtasks
  const completedTaskCount = itemSubTasks.filter((item) => {
    return item.completed === true;
  });

  //Updates todo complete state and completes all subtodos
  const onIsCompleteChange = () => {
    todosCtx.updateTodo(props.id, "isComplete", `${!props.isComplete}`, "task");
  };

  //Checks if due date  has passed for a task
  const isDateBeforeToday = (date: String) => {
    return new Date(date.toString()) < new Date(new Date().toDateString());
  };

  return (
    <React.Fragment>
      <Card>
        <div className={classes.flex}>
          <div>
            <div
              className={`${
                isDateBeforeToday(props.dueDate)
                  ? classes.pastdue
                  : classes.tododate
              }`}
            >
              Due Date: {props.dueDate}{" "}
              <span>
                (
                {props.subItem.length === 1
                  ? `${itemSubTasks.length} task, ${completedTaskCount.length} completed`
                  : `${itemSubTasks.length} tasks, ${completedTaskCount.length} completed`}
                )
              </span>
            </div>
            <br />
            <input
              style={{ verticalAlign: "center" }}
              onChange={onIsCompleteChange}
              checked={props.isComplete}
              type="checkbox"
            />{" "}
            <span className={classes.todoitem}>{props.text}</span>
          </div>
          <div className={classes.flex}>
            <RiEditBoxLine
              color="#1d344a"
              size="20"
              className={classes.icon}
              onClick={onShowModalHandler}
            />
            <RiDeleteBin7Line
              color="#F32013"
              size="20"
              className={classes.icon}
              onClick={props.onRemoveTodo}
            />
          </div>
        </div>
      </Card>
      {showModal && (
        <TodoDetails
          onRemoveSubTodo={props.onRemoveSubTodo}
          parentIsComplete={props.isComplete}
          dueDate={props.dueDate}
          parentid={props.id}
          task={props.text}
          moreDetails={props.moreDetails}
          subTasks={itemSubTasks}
          onHideModal={onHideModalHandler}
        />
      )}
    </React.Fragment>
  );
};

export default TodoItem;
