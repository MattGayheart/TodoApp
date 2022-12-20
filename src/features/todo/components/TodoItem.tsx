import React, { useState, useContext, useEffect } from "react";
import { TodosContext } from "../../../context/todos-context";
import Card from "../../../components/ui/Card";
import TodoDetails from "./TodoDetails";
import SubTodo from "../../../models/subtodo";
import classes from "../styles/TodoItem.module.css";
import { RiEditBoxLine, RiDeleteBin7Line } from "react-icons/ri";

const TodoItem: React.FC<{
  id: string;
  text: string;
  moreDetails: string;
  dueDate: string;
  subItem: SubTodo[];
  isComplete: boolean;
  onRemoveSubTodo: (id: string) => void;
  onRemoveTodo: () => void;
}> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const todosCtx = useContext(TodosContext);

  const onShowModalHandler = () => {
    setShowModal(true);
  };

  const onHideModalHandler = () => {
    setShowModal(false);
  };

  const itemSubTasks = props.subItem.filter((item) => {
    return item.parentID === props.id;
  });

  const completedTaskCount = itemSubTasks.filter((item) => {
    return item.completed === true;
  });

  const onIsCompleteChange = () => {
    todosCtx.updateTodo(props.id,'isComplete', `${!props.isComplete}`);
  }

  const  isDateBeforeToday = (date: String) => {
    return new Date(date.toString()) < new Date(new Date().toDateString());
  }

  return (
    <React.Fragment>
      <Card>
        <div className={classes.flex}>
          <div>
            <div className={`${isDateBeforeToday(props.dueDate) ? classes.pastdue : classes.tododate}`}>
              Due Date: {props.dueDate}{" "}
              <span>
                (
                {itemSubTasks.length === 1
                  ? `${itemSubTasks.length} task, ${completedTaskCount.length} completed`
                  : `${itemSubTasks.length} tasks, ${completedTaskCount.length} completed`}
                )
              </span>
            </div>
            <br />
            <input style={{ verticalAlign: "center" }} onChange={onIsCompleteChange} checked={props.isComplete} type="checkbox" />{" "}
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
