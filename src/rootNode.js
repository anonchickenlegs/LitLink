import React from "react";
import {
  createPaths,
  constructTree,
  calculateNumberOfNodesLeftAndRight,
  createPathsCircle,
  constructGraph,
} from "./utils";

const RootNode = ({ rootObj, showPartner, svgCenter }) => {
  // const rootNode = constructTree(rootObj);
  // calculateNumberOfNodesLeftAndRight(rootNode)
  const nodes = constructGraph(rootObj);

  return (
    <>
      <svg width="3000" height="3000" xmlns="http://www.w3.org/2000/svg">
        {/* <g>{createPaths(rootNode, [svgCenter, 200], showPartner)}</g> */}
        <g>{createPathsCircle(nodes, [svgCenter, 1500])}</g>
      </svg>
    </>
  );
};

export default RootNode;
