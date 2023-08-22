import { React, useState } from "react";
import { CIRCLE_RADIUS } from "./utils";

const NodeComp = ({ node, nodePos, isPartner }) => {
  const [showDetails, setShowDetails] = useState(false);
  debugger
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

  const handleMouseLeave = () => {
    setShowDetails(false);
  };

  const displayName = () => {
    if (isPartner) {
      return (
        <text x={nodePos[0]} y={nodePos[1] - 15}>
          {node.name}
        </text>
      );
    } else {
      return (
        <text x={nodePos[0]} y={nodePos[1] + 25}>
          {node.name}
        </text>
      )
    }
  }
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
      {displayName()  }
      {showDetailsBox()}
    </>
  );
};

export default NodeComp;
