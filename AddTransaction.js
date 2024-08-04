import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    // Convert the amount to a number
    const parsedAmount = parseFloat(amount);

    // Check if amount is valid
    if (isNaN(parsedAmount) || parsedAmount === 0) {
      setError("Please enter a valid amount."); // Set error message
      return; // Exit the function
    }

    // Clear error message if valid
    setError("");

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: parsedAmount,
    };

    addTransaction(newTransaction);

    // Clear the input fields
    setText("");  // Reset text input
    setAmount(""); // Reset amount input
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;

    // Allow only numbers, optional negative sign, and decimal point
    if (/^-?\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError(""); // Clear error message
    } else {
      setError("Please enter a valid amount."); // Set error message for invalid input
    }
  };

  return (
    <>
    <h3>Add new transaction</h3>
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="text">Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text..."
          className="input-field" // Add a class for styling
        />
      </div>
      <div className="form-control">
        <label htmlFor="amount">
          Amount (negative - expense, positive - income)
        </label>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount..."
          className="input-field" // Add a class for styling
        />
        {error && <p className="error">{error}</p>}
      </div>
      <button className="btn">Add transaction</button>
    </form>

    </>
  );
};
