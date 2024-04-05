"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, ModalBody } from "react-bootstrap";
import SendForm from "./SendForm";

interface Props {
  coins: string[];
  token: number;
}
const SendButton = ({ coins, token }: Props) => {
  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(true);
  };

  const handleCloseModal = () => {
    setShowComponent(false);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary mx-11"
        onClick={handleButtonClick}
      >
        Send
      </button>
      <Modal show={showComponent} onHide={handleCloseModal}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Send Crypto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SendForm coins={coins} token={token} />
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default SendButton;
