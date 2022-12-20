import {useContext} from 'react';
import { TodosContext } from "../../../context/todos-context";
import Modal from "../../../components/ui/Modal";
import SubTodo from "../../../models/subtodo";
import MoreDetails from "./MoreDetails";
import SubTodoItem from "./SubTodoItem";

const TodoDetails: React.FC<{
  parentid: string;
  parentIsComplete: boolean;
  dueDate: string;
  moreDetails: string;
  subTasks: SubTodo[];
  task: string;
  onRemoveSubTodo: (id: string) => void;
  onHideModal: () => void;
}> = (props) => {

  const todosCtx = useContext(TodosContext);

  const onDetailBlurHandler = (value: string) => {
    const enteredText = value;
    todosCtx.updateTodo(props.parentid, 'moreDetails', enteredText ?? '');
  };

  const onDateChangeHandler = (value: Date) => {
    let enteredDate = value;
    console.log("old " + enteredDate)
    enteredDate = new Date(enteredDate!);
    console.log("new " + enteredDate);
    todosCtx.updateTodo(props.parentid, 'dueDate', enteredDate.toLocaleDateString() ?? new Date());
  };

  const onCompletedChange = (value: boolean, id: string) => {
    todosCtx.updateSubTodo(id, 'isComplete', value);
    let canCheckParent = true;
    for(let i = 0; i < props.subTasks.length; i++) {
      if(!props.subTasks[i].completed) {
        canCheckParent = false;
        break;
      }
    }
    todosCtx.updateTodo(props.parentid, 'isComplete', `${canCheckParent}`);
  };

  return (
    <Modal onHideModal={props.onHideModal}>
      <MoreDetails moreDetails={props.moreDetails} task={props.task} dueDate={props.dueDate} onDetailBlurHandler={onDetailBlurHandler} onDateChangeHandler={onDateChangeHandler} />
      <SubTodoItem parentIsComplete={props.parentIsComplete} parentid={props.parentid} subTasks={props.subTasks} onRemoveSubTodo={props.onRemoveSubTodo} onCompltedChange={onCompletedChange} />
    </Modal>
  );
};

export default TodoDetails;
