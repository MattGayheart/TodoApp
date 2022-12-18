import React from 'react';

import Card from "../../../components/ui/Card";

const TodoItem: React.FC<{ text: string; onRemoveTodo: () => void }> = (props) => {
    return (
        <React.Fragment>
            <Card onClick={props.onRemoveTodo}>
                {props.text}
            </Card>
        </React.Fragment>
    )
}

export default TodoItem;