import { useRef } from "react";

import Card from "../../../components/ui/Card";

const MoreDetails: React.FC<{
  task: string;
  moreDetails: string;
  dueDate: string;
  onDetailBlurHandler: (value: string) => void;
  onDateChangeHandler: (value: string) => void;
}> = (props) => {
  //Grabs input values from more details and date fields
  const todoDetailInputRef = useRef<HTMLTextAreaElement>(null);
  const todoDateInputRef = useRef<HTMLInputElement>(null);

  //Passes function up to update todo.moreDetails
  const onDetailBlurHandler = () => {
    const enteredText = todoDetailInputRef.current?.value;
    props.onDetailBlurHandler(enteredText ?? "");
  };

  //Passes function up to update todo.dueDate
  const onDateChangeHandler = () => {
    let enteredDate = todoDateInputRef.current?.value;
    props.onDateChangeHandler(enteredDate!);
  };

  //JSX contains card with More Details and Date section
  return (
    <Card>
      <h3>{props.task}</h3>
      <label htmlFor="detailInput">
        <b>More Details:</b>
      </label>
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
      <label htmlFor="dateInput">
        <b>Due Date:</b>
      </label>
      <br />
      <input
        ref={todoDateInputRef}
        defaultValue={new Date(props.dueDate).toISOString().substring(0, 10)}
        id="dateInput"
        type="date"
        onChange={onDateChangeHandler}
      />
    </Card>
  );
};

export default MoreDetails;
