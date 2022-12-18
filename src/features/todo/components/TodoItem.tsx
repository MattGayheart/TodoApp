import React from 'react';

import classes from '../styles/TodoItem.module.css';

const TodoItem: React.FC<{ text: string; onRemoveTodo: () => void }> = (props) => {
    return (
        <React.Fragment>
            <li className={classes.item} onClick={props.onRemoveTodo}>
                {props.text}
            </li>
            <hr />
        </React.Fragment>
    )
}

export default TodoItem;