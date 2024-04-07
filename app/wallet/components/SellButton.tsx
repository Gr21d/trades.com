"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, ModalBody } from "react-bootstrap";
import SellForm from "./SellForm";

interface Props {
  coins: string[];
  token: number;
  prices: { symbol: string; price: string }[];
}
const SellButton = ({ coins, token, prices }: Props) => {
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
        className="btn mx-11"
        onClick={handleButtonClick}
        style={{ border: "2px solid black" }}
      >
        Sell
      </button>
      <Modal show={showComponent} onHide={handleCloseModal}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Sell Crypto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SellForm coins={coins} token={token} prices={prices} />
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
};

export default SellButton;
