import React, { useState } from 'react';
import SubTodo from '../../../models/subtodo';

import Card from "../../../components/ui/Card";
import TodoDetails from './TodoDetails';

const TodoItem: React.FC<{ text: string; moreDetails: string; dueDate: string; onRemoveTodo: () => void }> = (props) => {
    const [showModal, setShowModal] = useState(false);

    const onShowModalHandler = () => {
        setShowModal(true);
    };

    const onHideModalHandler = () => {
        setShowModal(false);
    };

    return (
        <React.Fragment>
            <Card onClick={onShowModalHandler}>
                <div className='tododate'>{props.dueDate}</div>
                <div id='todoitem'>{props.text}</div>
            </Card>
            {showModal && <TodoDetails moreDetails={props.moreDetails} onHideModal={onHideModalHandler} />}
        </React.Fragment>
    )
}

export default TodoItem;