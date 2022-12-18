import React from "react";
import ReactDom from 'react-dom';
import classes from "../styles/Modal.module.css";

const Backdrop: React.FC<{onHideModal: () => void}> = (props) => {
  return <div className={classes.backdrop} onClick={props.onHideModal}/>;
};

const ModalOverlay: React.FC = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays')!;

const Modal: React.FC<{onHideModal: () => void}> = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(<Backdrop onHideModal={props.onHideModal}/>, portalElement)}
      {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </React.Fragment>
  );
};

export default Modal;