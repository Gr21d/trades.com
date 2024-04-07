"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, ModalBody } from "react-bootstrap";
import WithdrawForm from "./WithdrawForm";

interface Props {
  token: number;
}
const WithdrawButton = ({ token }: Props) => {
  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(true);
  };

  const handleCloseModal = () => {
    setShowComponent(false);
  };
  return (
    <>
      <button type="button" className="btn" onClick={handleButtonClick}>
        Withdraw
      </button>
      <Modal show={showComponent} onHide={handleCloseModal} size="lg">
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Withdraw USD</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <WithdrawForm token={token} />
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default WithdrawButton;
