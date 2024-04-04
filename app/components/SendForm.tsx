"use client";
import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Modal,
  ModalBody,
  ModalDialog,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import Sending from "./Sending";

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
const SendForm = ({ coins, cryptos, cryptosOwned }: Props) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState(0);
  const [destination, setDestination] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform any necessary actions with the form data here
    const sent = Sending(destination, selectedCoin, amount);
    console.log("Selected Coin:", selectedCoin);
    console.log("Amount:", amount);
    console.log("Destination:", destination);
    setSelectedCoin("");
    setAmount(0);
    setDestination("");
  };

  const handleCloseModal = () => {
    setSubmitted(false);
  };

  return (
    <div className="p-3">
      <h2>Enter Coin Details</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2">
          <FormLabel>Select Coin:</FormLabel>
          <FormSelect
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
          >
            <option value="">Select a coin</option>
            {coins.map((coin, index) => (
              <option key={index} value={coin}>
                {coin}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
        <FormGroup className="mb-2">
          <FormLabel>Enter Amount:</FormLabel>
          <FormControl
            type="number"
            value={amount}
            placeholder="0"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </FormGroup>
        <div className="d-flex flex-column">
          <FormGroup className="mb-4">
            <FormLabel>Destination Number:</FormLabel>
            <FormControl
              type="text"
              value={destination}
              placeholder="Type in username"
              onChange={(e) => setDestination(e.target.value)}
            />
          </FormGroup>
          <Button type="submit" onClick={(e) => setSubmitted(true)}>
            Send
          </Button>
        </div>
      </Form>
      <Modal show={submitted} onHide={handleCloseModal} backdrop="static">
        <ModalDialog>
          <ModalHeader>
            <ModalTitle>Crypto Sent!</ModalTitle>
          </ModalHeader>
          <ModalBody className="d-flex flex-row justify-content-evenly">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCloseModal}
            >
              Done
            </button>
          </ModalBody>
        </ModalDialog>
      </Modal>
    </div>
  );
};

export default SendForm;
