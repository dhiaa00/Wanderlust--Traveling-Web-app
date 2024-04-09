import React from "react";
import "./expenses.css";

const Expenses = () => {
  const percentages = [30, 50, 20];
  return (
    <div className="expenses">
      <div
        className="transport-expenses expense"
        style={{
          width: `${percentages[0]}%`,
          height: `${percentages[0] + 10}%`,
        }}>
        {percentages[0]}%
      </div>
      <div
        className="hotels-expenses expense"
        style={{
          width: `${percentages[1]}%`,
          height: `${percentages[1] + 10}%`,
        }}>
        {percentages[1]}%
      </div>
      <div
        className="other-expenses expense"
        style={{
          width: `${percentages[2]}%`,
          height: `${percentages[2] + 10}%`,
        }}>
        {percentages[2]}%
      </div>
    </div>
  );
};

export default Expenses;
