import React from "react";

import classes from '../styles/Form.module.css';

// creates reusable styled form to stay consistent
const Form: React.FC<{ onSubmit?: React.FormEventHandler<HTMLFormElement> }> = (props) => {
    return (
        <form className={classes.form} onSubmit={props.onSubmit} >{props.children}</form>
    );
}

export default Form;