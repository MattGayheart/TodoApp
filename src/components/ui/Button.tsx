import React from "react";
import "../styles/Button.css";

const Button: React.FC<{ onClick?: React.MouseEventHandler<HTMLButtonElement>, className?: string, width: string, height: string }> = (props) => {
    return (
        <button className={props.className} onClick={props.onClick} style={{width:props.width, height:props.height}}>
            {props.children}
        </button>
    );
}

export default Button;