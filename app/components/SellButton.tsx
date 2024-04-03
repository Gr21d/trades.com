"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, ModalBody } from "react-bootstrap";
import SendForm from "./SendForm";
import SellForm from "./SellForm";

interface Props {
  coins: string[];
}
const SellButton = ({ coins }: Props) => {
  const [showComponent, setShowComponent] = useState(false);

  const handleButtonClick = () => {
    setShowComponent(true);
    console.log("clicked!");
  };

  const handleCloseModal = () => {
    setShowComponent(false);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={handleButtonClick}
      >
        Sell
      </button>
      <Modal show={showComponent} onHide={handleCloseModal}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Sell Crypto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SellForm coins={coins} />
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default SellButton;
