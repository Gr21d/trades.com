"use client";
import React, { use, useState } from "react";
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
const WithdrawForm = ({ token }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [amount, setAmount] = useState(0);
  const [failed, setFailed] = useState(false);
  const [beneficiery, setBeneficiery] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [accNumber, setAccNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(`wallet/walletAPIs/withdrawAPI`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          token: token,
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
      <h2>Enter Bank Details</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-2">
          <FormLabel>Beneficiery:</FormLabel>
          <FormControl
            type="text"
            value={beneficiery}
            placeholder="Beneficiery Full Name Here"
            onChange={(e) => setBeneficiery(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <FormLabel>Bank Name</FormLabel>
          <FormControl
            type="text"
            value={bankName}
            placeholder="Bank Name Here"
            onChange={(e) => setBankName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Enter Account Number:</FormLabel>
          <FormControl
            type="text"
            value={accNumber}
            placeholder="Enter bank number here (8 digits)"
            onChange={(e) => setAccNumber(e.target.value)}
            required
            pattern="\d{8}"
          />
        </FormGroup>
        <FormGroup className="mb-2 d-flex flex-row">
          <div className="me-5 d-flex flex-column justify-content-around">
            <FormLabel>Enter Sort Code:</FormLabel>
            <FormControl
              type="text"
              value={sortCode}
              placeholder="XX-XX-XX"
              onChange={(e) => setSortCode(e.target.value)}
              required
              pattern="^\d{2}-\d{2}-\d{2}$"
            />
          </div>
          <div className="d-flex flex-column justify-content-around">
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
          </div>
        </FormGroup>
        <div className="d-flex flex-column">
          <Button type="submit">Withdraw</Button>
        </div>
      </Form>
      <Modal show={submitted} onHide={handleCloseModal} backdrop="static">
        <ModalDialog>
          <ModalHeader>
            <ModalTitle>USD Withdrawn!</ModalTitle>
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
            <ModalTitle>Transaction Failed</ModalTitle>
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

export default WithdrawForm;
