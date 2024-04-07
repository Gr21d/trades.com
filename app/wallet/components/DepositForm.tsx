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
  token: number;
}
const DepositForm = ({ token }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardDate, setCardDate] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [failed, setFailed] = useState(false);
  function validateDate(inputDate: string) {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear() % 100;
    const [inputMonth, inputYear] = inputDate.split("/").map(Number);
    if (inputYear < currentYear) {
      return false;
    }
    if (inputMonth < 1 || inputMonth > 12) {
      return false;
    }
    if (inputYear === currentYear && inputMonth < currentMonth) {
      return false;
    }

    return true;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`wallet/walletAPIs/depositAPI`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          token: token,
        }),
      });
      if (response.ok && validateDate(cardDate)) {
        const data = await response.json();
        console.log("Response from server:", data);
        setSubmitted(true);
        setFailed(false);
      } else if (!validateDate(cardDate)) {
        console.error("Invalid card date");
        setSubmitted(false);
        setFailed(true);
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
      <h2>Enter Card Details</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2">
          <FormLabel>Enter Card Number:</FormLabel>
          <FormControl
            type="text"
            value={cardNumber}
            placeholder="XXXX-XXXX-XXXX-XXXX"
            onChange={(e) => setCardNumber(e.target.value)}
            required
            pattern="\d{16}"
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <FormLabel>Enter Card Name:</FormLabel>
          <FormControl
            type="text"
            value={cardName}
            placeholder="Your Name Here"
            onChange={(e) => setCardName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="mb-2 d-flex flex-row">
          <div className="me-5 d-flex flex-column justify-content-around">
            <FormLabel>Enter Card Date:</FormLabel>
            <FormControl
              type="text"
              value={cardDate}
              placeholder="MM/YY"
              onChange={(e) => setCardDate(e.target.value)}
              required
              pattern="^([1-9]|1[0-2])\/\d{2}$"
            />
          </div>
          <div className="d-flex flex-column justify-content-around">
            <FormLabel>Enter Card CVC:</FormLabel>
            <FormControl
              type="text"
              value={cardCVC}
              placeholder="CVC"
              onChange={(e) => setCardCVC(e.target.value)}
              required
              pattern="\d{3}"
            />
          </div>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Enter Amount:</FormLabel>
          <FormControl
            type="number"
            value={amount}
            placeholder="0"
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            required
            min="0.01"
            step="0.01"
          />
        </FormGroup>
        <div className="d-flex flex-column">
          <Button type="submit">Deposit</Button>
        </div>
      </Form>
      <Modal show={submitted} onHide={handleCloseModal} backdrop="static">
        <ModalDialog>
          <ModalHeader>
            <ModalTitle>USD Deposited!</ModalTitle>
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
            <ModalTitle>
              Transaction Failed
              {!validateDate(cardDate) && ": Card Date Invalid"}
            </ModalTitle>
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

export default DepositForm;
