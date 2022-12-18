import React from "react";
import "../styles/Button.css";

const Button: React.FC<{ onClick?: React.MouseEventHandler<HTMLButtonElement>, className?: string }> = (props) => {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Button;