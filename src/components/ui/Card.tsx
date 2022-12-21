import React from "react";
import classes from '../styles/Card.module.css'

//Creates reusable styled card to stay consistent
const Card: React.FC<{onClick?: React.MouseEventHandler<HTMLDivElement>}> = (props) => {
  return <div className={classes.card} onClick={props.onClick}>{props.children}</div>;
};

export default Card;