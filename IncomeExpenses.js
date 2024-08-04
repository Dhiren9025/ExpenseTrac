import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  const [zoomIncome, setZoomIncome] = useState(false);
  const [zoomExpense, setZoomExpense] = useState(false);

  useEffect(() => {
    if (parseFloat(income) > 0) {
      setZoomIncome(true);
      const timer = setTimeout(() => setZoomIncome(false), 500);
      return () => clearTimeout(timer);
    }
  }, [income]);

  useEffect(() => {
    if (parseFloat(expense) > 0) {
      setZoomExpense(true);
      const timer = setTimeout(() => setZoomExpense(false), 500);
      return () => clearTimeout(timer);
    }
  }, [expense]);

  const getClassNameForAmount = (amount) => {
    if (parseFloat(amount) > 10000000000) return "money xlarge-amount";
    if (parseFloat(amount) > 1000000000) return "money large-amount";
    if (parseFloat(amount) > 99999) return "money medium-amount show-tooltip";
    return "money";
  };

  return (
    <div className="inc-exp-container">
      <div>
        <h4>
          <span className={`emoji ${zoomIncome ? "zoom" : ""}`}> &#128578; </span>
          Income
        </h4>
        <p id="money-plus" className={`money plus ${getClassNameForAmount(income)}`} title={parseFloat(income) > 99999 ? income : ''}>
          {income}
        </p>
      </div>

      <div>
        <h4>
          <span className={`emoji ${zoomExpense ? "zoom" : ""}`}> &#128577; </span>
          Expense
        </h4>
        <p id="money-minus" className={`money minus ${getClassNameForAmount(expense)}`} title={parseFloat(expense) > 99999 ? expense : ''}>
          {expense}
        </p>
      </div>
    </div>
  );
};
