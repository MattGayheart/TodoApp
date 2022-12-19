import Modal from "../../../components/ui/Modal";
import NewSubTodo from "./NewSubTodo";
import Card from "../../../components/ui/Card";
import SubTodo from "../../../models/subtodo";
import MoreDetails from "./MoreDetails";
import SubTodoItem from "./SubTodoItem";

const TodoDetails: React.FC<{
  parentid: string;
  dueDate: string;
  moreDetails: string;
  subTasks: SubTodo[];
  task: string;
  onRemoveSubTodo: (id: string) => void;
  onHideModal: () => void;
}> = (props) => {
  return (
    <Modal onHideModal={props.onHideModal}>
      <MoreDetails moreDetails={props.moreDetails} task={props.task} dueDate={props.dueDate} id={props.parentid} />
      <SubTodoItem parentid={props.parentid} subTasks={props.subTasks} onRemoveSubTodo={props.onRemoveSubTodo} />
    </Modal>
  );
};

export default TodoDetails;
