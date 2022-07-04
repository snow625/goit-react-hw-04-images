import { useEffect } from "react";
import { createPortal } from "react-dom";

import PropTypes from "prop-types";

import style from "./modal.module.css";

const modalPlace = document.getElementById("modal-root");

const Modal = (props) => {
  const { children, onClose } = props;

  useEffect(() => {
    document.addEventListener("keydown", handleClose);
    return () => document.removeEventListener("keydown", handleClose);
  }, []);

  function handleClose(event) {
    const { target, currentTarget, code } = event;
    if (target === currentTarget || code === "Escape") {
      onClose();
    }
  }

  return createPortal(
    <div onClick={handleClose} className={style.overlay}>
      <div className={style.modal}>{children}</div>
    </div>,
    modalPlace
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
