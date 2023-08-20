import { React, useState } from "react";
import { CIRCLE_RADIUS } from "./utils";

const NodeComp = ({ node, nodePos }) => {
  const [showDetails, setShowDetails] = useState(false);

  const showDetailsBox = () => {
    if (showDetails) {
      return (
        <rect
          x={nodePos[0]}
          y={nodePos[1]}
          width="150"
          height="150"
          stroke="green"
          fill="yellow"
          strokeWidth="2"
        />
      );
    } else {
      return [];
    }
  };
  const handleMouseEnter = () => {
    setShowDetails(true);
  };

  const handleMouseLeave = () => {\
    setShowDetails(false);
  };

  return (
    <>
      <circle
        key={nodePos[0] + nodePos[1]}
        cx={nodePos[0]}
        cy={nodePos[1]}
        r={CIRCLE_RADIUS}
        stroke="green"
        fill="yellow"
        strokeWidth="2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></circle>
      {showDetailsBox()}
    </>
  );
};

export default NodeComp;
