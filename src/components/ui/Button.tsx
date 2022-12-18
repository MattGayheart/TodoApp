import React from "react";
import classes from "../styles/Button.module.css";

const Button: React.FC<{ onClick?: React.MouseEventHandler<HTMLButtonElement> }> = (props) => {
    return (
        <button className={classes.button} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Button;