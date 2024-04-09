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

interface Props {
  coins: string[];
  token: number;
  prices: { symbol: string; price: string }[];
}
const SellForm = ({ coins, token, prices }: Props) => {
  const [selectedCoin, setSelectedCoin] = useState("");
  const [amount, setAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Selected Coin:", selectedCoin);
    console.log("Amount:", amount);
    setSelectedCoin("");
    setAmount(0);
    const price = prices.filter(
      (p) => p.symbol == selectedCoin.toUpperCase().concat("USDT")
    )[0];
    try {
      const response = await fetch(`wallet/walletAPIs/sellAPI`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symbol: selectedCoin,
          amount: amount,
          token: token,
          price: parseFloat(price.price),
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Response from server:", data);
        setSubmitted(true);
        setFailed(false);
      } else {
        console.error("Error", response.statusText);
        setSubmitted(false);
        setFailed(true);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleCloseModal = () => {
    setSubmitted(false);
    setFailed(false);
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
            required
          >
            <option value="">Select a coin</option>
            {coins.map((coin, index) => (
              <option key={index} value={coin}>
                {coin}
              </option>
            ))}
          </FormSelect>
        </FormGroup>
        <FormGroup className="mb-4">
          <FormLabel>Enter Amount:</FormLabel>
          <FormControl
            type="number"
            value={amount}
            placeholder="0"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            required
            min="0.0001"
            step="0.0001"
          />
        </FormGroup>
        <div className="d-flex flex-column">
          <Button type="submit">Sell</Button>
        </div>
      </Form>
      <Modal show={submitted} onHide={handleCloseModal} backdrop="static">
        <ModalDialog>
          <ModalHeader>
            <ModalTitle>Crypto Sold!</ModalTitle>
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
      <Modal show={failed} onHide={handleCloseModal} backdrop="static">
        <ModalDialog>
          <ModalHeader>
            <ModalTitle>Crypto Could Not Be Sold!</ModalTitle>
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

export default SellForm;
