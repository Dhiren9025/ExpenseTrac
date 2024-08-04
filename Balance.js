import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // Determine if the total amount is greater than or equal to 100,000,000,000,000
  const showTooltip = parseFloat(total) >= 100000000000000;

  return (
    <>
      <h4> Your balance <span className="bal"> &#128176;</span> </h4>
      <h1
        id="balance"
        className={showTooltip ? "show-tooltip" : ""}
        title={showTooltip ? `₹${total}` : ""}
      >
        ₹{total}
      </h1>
    </>
  );
};
