import Modal from "../../../components/ui/Modal";
import SubTodo from "../../../models/subtodo";
import NewSubTodo from "./NewSubTodo";

const TodoDetails: React.FC<{ moreDetails: string; onHideModal: () => void }> = (props) => {
    return (
        <Modal onHideModal={props.onHideModal} >
            <h3>Details:</h3>
            <p>{props.moreDetails === '' ? 'No details' : props.moreDetails}</p>
            <hr />
            <h3>Sub Todos</h3>
        </Modal>
        
    );
}

export default TodoDetails;