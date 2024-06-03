import React from "react";
import "./elementcomponent.css";
const ElementComponent = (date, description, amount, category, account) => {
  return (
    <div className="container-componenet">
      <div className="date-container">{(date = "11-02-2018")}</div>
      <div className="description-container">
        {(description = "Mido Bounar")}
      </div>
      <div className="amount-container">{(amount = "$290")}</div>
      <div className="category-container">{(category = "Send")}</div>
      <div className="account-container">{(account = "Savings")}</div>
    </div>
  );
};

export default ElementComponent;
