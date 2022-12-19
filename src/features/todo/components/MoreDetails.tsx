import { useContext, useRef } from "react";
import { TodosContext } from "../../../context/todos-context";
import Card from "../../../components/ui/Card";

const MoreDetails: React.FC<{ task: string; moreDetails: string, id: string, dueDate: string }> = (
  props
) => {
  const todosCtx = useContext(TodosContext);
  const todoDetailInputRef = useRef<HTMLTextAreaElement>(null);
  const todoDateInputRef = useRef<HTMLInputElement>(null);

  const onDetailBlurHandler = () => {
    const enteredText = todoDetailInputRef.current?.value;
    todosCtx.updateTodo(props.id, 'moreDetails', enteredText ?? '');
  };

  const onDateChangeHandler = () => {
    let enteredDate = todoDateInputRef.current?.valueAsDate;
    console.log("old " + enteredDate)
    enteredDate = new Date(enteredDate!);
    console.log("new " + enteredDate);
    todosCtx.updateTodo(props.id, 'dueDate', enteredDate.toLocaleDateString() ?? new Date());
  }

  return (
    <Card>
      <h3>{props.task}</h3>
      <label htmlFor="detailInput"><b>More Details:</b></label>
      <textarea
        id="detailInput"
        style={{ width: "100%", resize: "vertical" }}
        rows={5}
        defaultValue={
          props.moreDetails === "" ? "No details" : props.moreDetails
        }
        onBlur={onDetailBlurHandler}
        ref={todoDetailInputRef}
      />
      <label htmlFor="dateInput"><b>Due Date:</b></label>
      <br/>
      <input ref={todoDateInputRef} defaultValue={new Date(props.dueDate).toISOString().substring(0,10)} id='dateInput' type='date' onChange={onDateChangeHandler} />
    </Card>
  );
};

export default MoreDetails;
