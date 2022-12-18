import React, { FormEvent } from "react";

import classes from '../styles/Form.module.css';

const Form: React.FC<{ onSubmit: React.FormEventHandler<HTMLFormElement> }> = (props) => {
    return (
        <form className={classes.form} onSubmit={props.onSubmit} >{props.children}</form>
    );
}

export default Form;