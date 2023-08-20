import React from "react";
import {createPaths, constructTree, calculateNumberOfNodesLeftAndRight} from "./utils"

const RootNode = ({rootObj, showPartner, svgCenter}) => {
  const rootNode = constructTree(rootObj);
  calculateNumberOfNodesLeftAndRight(rootNode)

  return (
    <>
      <svg width="2000" height="3000" xmlns="http://www.w3.org/2000/svg">
        <g>{createPaths(rootNode, [svgCenter, 20], showPartner)}</g>
      </svg>
    </>
  );
  
}


export default RootNode