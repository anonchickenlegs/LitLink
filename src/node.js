import React from "react";
import {
  CIRCLE_RADIUS
} from "./utils";

const NodeComp = ({ node, nodePos}) => {

  const showDetailsBox = () => {
    return "banana"
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
      ></circle>
    </>
  );
};

export default NodeComp;
