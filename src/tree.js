import React from "react";
class Node {
  constructor(name, parent, children = []) {
    this.leftNodes = [];
    this.rightNodes = [];
    this.middleNode = [];
    this.children = children;
    this.parent = parent; // this a reference to a node instance
    this.name = name;
    this.numberOfNodesLeft = 0;
    this.numberOfNodesRight = 0;
    this.nodePos = null;
  }
}

const Tree = (props) => {
  const svgCenter = "1000";
  const circleRadius = "5";
  const height = 100;
  let rootNode = null;
  const childrenSpacing = 100;
  //here we are finding the left middle and right nodes of a parent node that is passed in the argument
  const findLeftMiddleRightChildren = (childrenArr, parent) => {
    const leftChildren = [];
    const middleChild = [];
    const rightChildren = [];

    //we are slicing to get left or right children and then creating each one of the items
    //into Node instance
    //for middle children we don't need to map because it will always just be one child in the middle
    if (childrenArr.length % 2 === 0) {
      leftChildren.push(
        ...childrenArr
          .slice(0, childrenArr.length / 2)
          .map((child) => new Node(child.name, parent, child.children))
      );
      rightChildren.push(
        ...childrenArr
          .slice(childrenArr.length / 2, childrenArr.length)
          .map((child) => new Node(child.name, parent, child.children))
      );
    } else {
      leftChildren.push(
        ...childrenArr
          .slice(0, Math.floor(childrenArr.length / 2))
          .map((child) => new Node(child.name, parent, child.children))
      );
      const child = childrenArr[Math.floor(childrenArr.length / 2)];
      middleChild.push(new Node(child.name, parent, child.children));
      rightChildren.push(
        ...childrenArr
          .slice(Math.floor(childrenArr.length / 2) + 1, childrenArr.length)
          .map((child) => new Node(child.name, parent, child.children))
      );
    }

    return [leftChildren, middleChild, rightChildren];
  };

  //here we are constructing a tree using BFS (breadth first search)
  const constructTree = (root) => {
    rootNode = new Node(root.name, null, root.children);
    const queue = [rootNode];

    while (queue.length) {
      const node = queue.shift();
      const children = node.children;

      const leftMiddleRightChildren = findLeftMiddleRightChildren(
        children,
        node
      );
      node.leftNodes = leftMiddleRightChildren[0];
      node.middleNode = leftMiddleRightChildren[1];
      node.rightNodes = leftMiddleRightChildren[2];

      queue.push(
        ...leftMiddleRightChildren[0],
        ...leftMiddleRightChildren[1],
        ...leftMiddleRightChildren[2]
      );
    }
  };

  //This will be a dfs approach to figure out the number of node to
  //the left and right of a node
  const calculateNumberOfNodesLeftAndRight = (node) => {
    if (node.leftNodes.length === 0 && node.rightNodes.length === 0) {
      return [0, 0];
    }
    let countOfLeftNodes = node.leftNodes.length;
    let countOfRightNodes = node.rightNodes.length;
    node.leftNodes.forEach((child) => {
      const [leftCount, rightCount] = calculateNumberOfNodesLeftAndRight(child);
      countOfLeftNodes += leftCount;
      child.nodePos = countOfLeftNodes;
      countOfLeftNodes += rightCount;
    });

    node.middleNode.forEach((child) => {
      const [leftCount, rightCount] = calculateNumberOfNodesLeftAndRight(child);
      countOfLeftNodes += leftCount;
      countOfRightNodes += rightCount;
      child.nodePos = countOfLeftNodes + 1
    });

    node.rightNodes.forEach((child) => {
      const [leftCount, rightCount] = calculateNumberOfNodesLeftAndRight(child);
      countOfRightNodes += leftCount;
      child.nodePos = countOfLeftNodes + countOfRightNodes;
      countOfRightNodes += rightCount;
    });

    node.numberOfNodesLeft = countOfLeftNodes;
    node.numberOfNodesRight = countOfRightNodes;

    return [countOfLeftNodes, countOfRightNodes];
  };

  const findCoordinatesForChildren = (
    parentPosition,
    numberOfChildren,
    positionsToDrawNodes,
    children
  ) => {
    const coordinates = [];
    
    let numberOfChildrenLeft = Math.floor(numberOfChildren / 2);
    let numberOfChildrenRight = Math.floor(numberOfChildren / 2);
    debugger

    let childrenCounter = 1; 
    while (numberOfChildrenLeft >= 0) {
      if (positionsToDrawNodes.includes(childrenCounter)) {
        const xCoordinate =
          parseInt(parentPosition[0]) -
          childrenSpacing / 2 -
          numberOfChildrenLeft * childrenSpacing;
        coordinates.push([
          String(xCoordinate),
          String(height + parseInt(parentPosition[1])),
          children.shift()
        ]);
      }
      numberOfChildrenLeft -= 1;
      childrenCounter += 1;
    } 

    while (numberOfChildrenRight >= 0) {
      if (positionsToDrawNodes.includes(childrenCounter)) {
        const xCoordinate =
          childrenSpacing / 2 +
          numberOfChildrenRight * childrenSpacing +
          parseInt(parentPosition[0]);
        coordinates.push([
          String(xCoordinate),
          String(height + parseInt(parentPosition[1])),
          children.shift()
        ]);
      }
      numberOfChildrenRight -= 1;
      childrenCounter += 1;
    }

    return coordinates

  }

  const createPaths = (node, parentPos, paths = []) => {
    //coordinates of children
    let coordinates = [];
    if (node && node.children.length > 0) {
      const positionsToDrawNodes = [];
      const children = [...node.leftNodes,...node.middleNode,...node.rightNodes]
      positionsToDrawNodes.push(
        ...node.leftNodes.map((child) => child.nodePos)
      );
      positionsToDrawNodes.push(
        ...node.middleNode.map((child) => child.nodePos)
      );
      positionsToDrawNodes.push(
        ...node.rightNodes.map((child) => child.nodePos)
      );
      coordinates.push(
        ...findCoordinatesForChildren(
          parentPos,
          node.middleNode.length + node.numberOfNodesLeft + node.numberOfNodesRight,
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

    coordinates.forEach((coord, idx) => {
      const firstControlPointX = Math.abs(
        (parseInt(parentPos[0]) + parseInt(coord[0])) / 2
      );
      const firstControlPointY = parseInt(parentPos[1]) + height / 2;
      const secondControlPointX = coord[0];
      const secondControlPointY = coord[1] - 70;
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
      <svg width="3000" height="500" xmlns="http://www.w3.org/2000/svg">
        <g>{createPaths(rootNode, [svgCenter, "20"])}</g>
      </svg>
    </div>
  );
};

export default Tree;
