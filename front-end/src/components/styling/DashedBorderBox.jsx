import React from "react";

const DashedBorderBox = () => {
  const dashArray = "10, 5"; // Customize spacing here (dash length, space)

  return (
    <svg width="200" height="100">
      <rect
        x="0"
        y="0"
        width="200"
        height="100"
        stroke="black"
        stroke-width="2"
        fill="none"
        stroke-dasharray={dashArray}
      />
    </svg>
  );
};

export default DashedBorderBox;
