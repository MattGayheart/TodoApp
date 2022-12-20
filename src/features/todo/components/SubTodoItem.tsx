import Card from "../../../components/ui/Card";
import SubTodo from "../../../models/subtodo";
import NewSubTodo from "./NewSubTodo";
import classes from "../styles/SubTodoItem.module.css";
import { RiDeleteBin7Line } from "react-icons/ri";

const SubTodoItem: React.FC<{
  subTasks: SubTodo[];
  parentid: string;
  parentIsComplete: boolean;
  onCompltedChange: (value: boolean, id: string) => void;
  onRemoveSubTodo: (id: string) => void;
}> = (props) => {

  const onRemoveSubTodoHandler = (id: string) => {
    props.onRemoveSubTodo(id);
  };

  const onCompletedChange = (value: boolean, id: string) => {
    const isCompleted = value;
    props.onCompltedChange(isCompleted!, id);
  };

  return (
    <Card>
      <NewSubTodo parentid={props.parentid} />
      <br />
      {props.subTasks.map((item) => (
        <Card key={item.id}>
          <div className={classes.flex}>
            <div>
              <input style={{ verticalAlign: "center" }} defaultChecked={item.completed} onChange={(e) => {onCompletedChange(e.target.checked,item.id)}} type="checkbox" />{" "}
              <span>{item.text}</span>
            </div>

            <div>
              <RiDeleteBin7Line
                color="#F32013"
                size="20"
                className={classes.icon}
                onClick={() => onRemoveSubTodoHandler(item.id)}
              />
            </div>
          </div>
        </Card>
      ))}
    </Card>
  );
};

export default SubTodoItem;
