"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, ModalBody } from "react-bootstrap";
import DepositForm from "./DepositForm";

interface Props {
  token: number;
}
const DepositButton = ({ token }: Props) => {
  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(true);
  };

  const handleCloseModal = () => {
    setShowComponent(false);
  };
  return (
    <>
      <button type="button" className="btn mx-11" onClick={handleButtonClick}>
        Deposit
      </button>
      <Modal show={showComponent} onHide={handleCloseModal} size="lg">
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Deposit USD</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DepositForm token={token} />
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default DepositButton;
