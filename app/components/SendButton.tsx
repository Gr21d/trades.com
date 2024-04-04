"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, ModalBody } from "react-bootstrap";
import SendForm from "./SendForm";

interface Props {
  coins: string[];
  cryptos: {
    id: number;
    name: string;
    symbol: string;
  }[];
  cryptosOwned: {
    id: number;
    portfolioId: number;
    cryptoId: number;
    quantity: number;
    buyPrice: number;
  }[];
}
const SendButton = ({ coins, cryptos, cryptosOwned }: Props) => {
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
            <SendForm
              coins={coins}
              cryptos={cryptos}
              cryptosOwned={cryptosOwned}
            />
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default SendButton;
