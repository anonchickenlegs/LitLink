import React from "react";
class Node {
  constructor(name, parent, children = []) {
    this.leftNodes = [];
    this.rightNodes = [];
    this.children = children;
    this.parent = parent; // this a reference to a node instance
    this.name = name;
    this.numberOfNodesLeft = 0;
    this.numberOfNodesRight = 0;
    this.nodePos = null;
  }
}

const Tree = (props) => {
  const svgCenter = "3000";
  const circleRadius = "5";
  const height = 100;
  let rootNode = null;
  const childrenSpacing = 100;

  //here we are finding the left middle and right nodes of a parent node that is passed in the argument
  const findLeftRightChildren = (childrenArr, parent) => {
    const leftChildren = [];
    const rightChildren = [];

    //we are slicing to get left or right children and then creating each one of the items
    //into Node instance
    //for middle children we don't need to map because it will always just be one child in the middle
    leftChildren.push(
      ...childrenArr
        .slice(0, Math.floor(childrenArr.length / 2))
        .map((child) => new Node(child.name, parent, child.children))
    );
    rightChildren.push(
      ...childrenArr
        .slice(Math.floor(childrenArr.length / 2), childrenArr.length)
        .map((child) => new Node(child.name, parent, child.children))
    );

    return [leftChildren, rightChildren];
  };

  //here we are constructing a tree using BFS (breadth first search)
  const constructTree = (root) => {
    rootNode = new Node(root.name, null, root.children);
    const queue = [rootNode];

    while (queue.length) {
      const node = queue.shift();
      const children = node.children;

      const leftRightChildren = findLeftRightChildren(children, node);
      node.leftNodes = leftRightChildren[0];
      node.rightNodes = leftRightChildren[1];

      queue.push(...leftRightChildren[0], ...leftRightChildren[1]);
    }
  };

  //This will be a dfs approach to figure out the number of node to
  //the left and right of a node
  const calculateNumberOfNodesLeftAndRight = (node) => {
    if (node.leftNodes.length === 0 && node.rightNodes.length === 0) {
      return [0, 0];
    }
    let countOfLeftNodes = 0;
    let countOfRightNodes = 0;

    node.leftNodes.forEach((child) => {
      const [leftCount, rightCount] = calculateNumberOfNodesLeftAndRight(child);
      child.nodePos = countOfLeftNodes + leftCount + 1;
      countOfLeftNodes += leftCount + rightCount + 1;
    });

    node.rightNodes.forEach((child) => {
      const [leftCount, rightCount] = calculateNumberOfNodesLeftAndRight(child);
      child.nodePos = countOfLeftNodes + countOfRightNodes + leftCount + 1;
      countOfRightNodes += leftCount + rightCount + 1;
    });

    node.numberOfNodesLeft = countOfLeftNodes;
    node.numberOfNodesRight = countOfRightNodes;

    return [countOfLeftNodes, countOfRightNodes];
  };

  const findCoordinatesForChildren = (
    parentPosition,
    numberOfChildrenLeft,
    numberOfChildrenRight,
    positionsToDrawNodes,
    children
  ) => {
    const coordinates = [];
    let leftNodePos =
      parseInt(parentPosition[0]) - childrenSpacing * numberOfChildrenLeft;
    let rightNodePos = parseInt(parentPosition[0]) + childrenSpacing;
    //find coordinates for children to the left of parent
    for (let i = 1; i <= numberOfChildrenLeft; i++) {
      if (positionsToDrawNodes.includes(i)) {
        coordinates.push([
          String(leftNodePos),
          String(height + parseInt(parentPosition[1])),
          children.shift(),
        ]);
      }

      leftNodePos += childrenSpacing;
    }
    //find coordinates for children to the right of parent
    for (
      let i = numberOfChildrenLeft + 1;
      i <= numberOfChildrenLeft + numberOfChildrenRight;
      i++
    ) {
      if (positionsToDrawNodes.includes(i)) {
        coordinates.push([
          String(rightNodePos),
          String(height + parseInt(parentPosition[1])),
          children.shift(),
        ]);
      }

      rightNodePos += childrenSpacing;
    }

    return coordinates;
  };

  const createPaths = (node, parentPos, paths = []) => {
    //coordinates of children
    let coordinates = [];
    if (node && node.children.length > 0) {
      const positionsToDrawNodes = [];
      const children = [...node.leftNodes, ...node.rightNodes];
      positionsToDrawNodes.push(
        ...node.leftNodes.map((child) => child.nodePos)
      );
      positionsToDrawNodes.push(
        ...node.rightNodes.map((child) => child.nodePos)
      );
      coordinates.push(
        ...findCoordinatesForChildren(
          parentPos,
          node.numberOfNodesLeft,
          node.numberOfNodesRight,
          positionsToDrawNodes,
          children
        )
      );
    }
    //circle svg of the parent
    const circle = (
      <circle
        cx={parentPos[0]}
        cy={parentPos[1]}
        r={circleRadius}
        stroke="green"
        fill="yellow"
        stroke-width="2"
      ></circle>
    );
    paths.push(circle);

    coordinates.forEach((coord) => {
      const firstControlPointX = Math.abs(
        (parseInt(parentPos[0]) + parseInt(coord[0])) / 2
      );
      const firstControlPointY = parseInt(parentPos[1]) + height / 2;
      const secondControlPointX = coord[0];
      const secondControlPointY = coord[1] - 70;
      debugger;
      createPaths(coord[2], coord, paths);

      const path = (
        <path
          d={`M${parentPos[0]} ${parentPos[1]} C${String(
            firstControlPointX
          )} ${String(firstControlPointY)}, ${String(
            secondControlPointX
          )} ${String(secondControlPointY)}, ${coord[0]} ${coord[1]} `}
          stroke="black"
          fill="transparent"
        ></path>
      );

      paths.push(path);
    });

    return paths;
  };

  constructTree(props.data);
  calculateNumberOfNodesLeftAndRight(rootNode);
  return (
    <div>
      <svg width="6000" height="1000" xmlns="http://www.w3.org/2000/svg">
        <g>{createPaths(rootNode, [svgCenter, "20"])}</g>
      </svg>
    </div>
  );
};

export default Tree;
