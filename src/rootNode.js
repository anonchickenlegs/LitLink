import React from "react";
import {createPaths, constructTree, calculateNumberOfNodesLeftAndRight} from "./utils"

const RootNode = ({rootObj, showPartner, svgCenter}) => {
  const rootNode = constructTree(rootObj);
  calculateNumberOfNodesLeftAndRight(rootNode)

  return (
    <>
      <svg width="3000" height="600" xmlns="http://www.w3.org/2000/svg">
        <g>{createPaths(rootNode, [svgCenter, 200], showPartner)}</g>
      </svg>
    </>
  );
  
}


export default RootNode