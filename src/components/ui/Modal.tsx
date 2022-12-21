import React from "react";
import ReactDom from "react-dom";
import classes from "../styles/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import Button from "./Button";


//Adds backdrop behind the modal to make it stand out
const Backdrop: React.FC<{ onHideModal: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onHideModal} />;
};

//Creates modal to store content in
const ModalOverlay: React.FC<{ onHideModal: () => void }> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.closebtn} style={{right:'5px',top:'5px',position:'absolute'}}>
        <RiCloseLine onClick={props.onHideModal} size="25" />
      </div>

      <div className={classes.content}>{props.children}</div>
      <div style={{ float: "right" }}>
        <Button
          onClick={props.onHideModal}
          className="btn btn-primary"
          height="35px"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays")!;

// Combines backdrop and modal into one component. Creates portal to top of Index.html page so modal is positioned correctly
const Modal: React.FC<{ onHideModal: () => void }> = (props) => {
  return (
    <React.Fragment>
      {ReactDom.createPortal(
        <Backdrop onHideModal={props.onHideModal} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay onHideModal={props.onHideModal}>
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </React.Fragment>
  );
};

export default Modal;
