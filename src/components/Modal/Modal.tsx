import React from "react";

import style from "./modal.module.css";

interface ModalProps {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactElement;
}

export const Modal: React.FC<ModalProps> = ({
  modalActive,
  setModalActive,
  children,
}) => {
  return (
    <>
      <div
        className={modalActive ? `${style.modal} ${style.active}` : style.modal}
        onClick={() => setModalActive(false)}
      >
        <div
          className={
            modalActive
              ? `${style.modal_content} ${style.active}`
              : style.modal_content
          }
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
};
