import NodeComp from "./node";
export const CIRCLE_RADIUS = "70";
const HEIGHT = 100;
const CHILDREN_SPACING = 100;
const RADIUS = 500;
class Node {
  constructor(id, name, children, partners) {
    this.leftNodes = [];
    this.rightNodes = [];
    // this represents all children that the node has in object form
    this.children = children;
    this.name = name;
    this.numberOfNodesLeft = 0;
    this.numberOfNodesRight = 0;
    this.nodePos = null;
    // this represents all partners that the node has in object form
    this.partners = partners;
    this.partnerNodes = [];
    this.id = id;
    this.partnerToDisplay = 0;
    this.xPos = null;
    this.yPos = null;
    this.circlePos = null;
  }
}

class RelationshipNode {
  constructor(name, bio) {
    this.name = name;
    this.relationships = []; //array of relationshipNodes it's connected to
    this.bio = bio;
    this.circlePos = null;
  }
}

//here we are finding the left and right nodes of a parent node that is passed in the argument
const findLeftRightChildren = (childrenArr) => {
  const leftChildren = [];
  const rightChildren = [];

  //we are slicing to get left or right children and then creating each one of the items
  //into Node instances
  leftChildren.push(
    ...childrenArr.slice(0, Math.floor(childrenArr.length / 2))
  );
  rightChildren.push(
    ...childrenArr.slice(Math.floor(childrenArr.length / 2), childrenArr.length)
  );

  return [leftChildren, rightChildren];
};

//This implementation will create all children as nodes and then figure out which ones
//go to the left and right of the tree
export const constructTree = (root) => {
  const rootNode = new Node(
    root.id,
    root.name,
    [...root.children],
    root.partners
  );
  const queue = [rootNode];

  while (queue.length) {
    const node = queue.shift();
    const childrenIds = {};
    const nodeChildrenNodes = node.children.map((child) => {
      const node = new Node(
        child.id,
        child.name,
        [...child.children],
        child.partners
      );
      childrenIds[child.id] = node;
      return node;
    });

    node.partners.forEach((partner) => {
      const partnerNode = new Node(
        partner.id,
        partner.name,
        [...partner.children],
        partner.partners
      );
      node.partnerNodes.push(partnerNode);
      const partnerChildrenNodes = [];

      partner.children.forEach((child) => {
        if (child.id in childrenIds) {
          partnerChildrenNodes.push(childrenIds[child.id]);
        }
      });

      const leftRightChildren = findLeftRightChildren(partnerChildrenNodes);

      partnerNode.leftNodes = leftRightChildren[0];
      partnerNode.rightNodes = leftRightChildren[1];
      queue.push(...leftRightChildren[0], ...leftRightChildren[1]);
    });

    const leftRightChildren = findLeftRightChildren(nodeChildrenNodes);
    node.leftNodes = leftRightChildren[0];
    node.rightNodes = leftRightChildren[1];
  }

  return rootNode;
};

//This will be a dfs approach to figure out the number of node to
//the left and right of a node.
//we also give each node a position that is based on positions as if the subtree
//of each node was flattened
export const calculateNumberOfNodesLeftAndRight = (node) => {
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
  let leftNodePos = parentPosition[0] - CHILDREN_SPACING * numberOfChildrenLeft;
  let rightNodePos = parentPosition[0] + CHILDREN_SPACING;
  //find coordinates for children to the left of parent
  for (let i = 1; i <= numberOfChildrenLeft; i++) {
    if (positionsToDrawNodes.includes(i)) {
      coordinates.push([
        leftNodePos,
        HEIGHT + parentPosition[1],
        children.shift(),
      ]);
    }

    leftNodePos += CHILDREN_SPACING;
  }
  //find coordinates for children to the right of parent
  for (
    let i = numberOfChildrenLeft + 1;
    i <= numberOfChildrenLeft + numberOfChildrenRight;
    i++
  ) {
    if (positionsToDrawNodes.includes(i)) {
      coordinates.push([
        rightNodePos,
        HEIGHT + parentPosition[1],
        children.shift(),
      ]);
    }

    rightNodePos += CHILDREN_SPACING;
  }

  return coordinates;
};

function evenlySpaceNodesAroundCircle(centerX, centerY, nodes, radius) {
  const angleIncrement = (2 * Math.PI) / nodes.length;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const angle = i * angleIncrement;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    node.circlePos = [x, y];
  }
}

export const constructGraph = ({ characters, relationships }) => {
  const relationshipMapping = {};
  const nodes = characters.map((character) => {
    const newNode = new RelationshipNode(character.name, character.bio);
    relationshipMapping[character.name] = newNode;

    return newNode;
  });

  relationships.forEach((relationship) => {
    relationshipMapping[relationship["character1"]].relationships.push({
      relationNode: relationshipMapping[relationship["character2"]],
      description: relationship[2],
    });

    relationshipMapping[relationship["character2"]].relationships.push({
      relationNode: relationshipMapping[relationship["character1"]],
      description: relationship["description"],
    });
  });

  return nodes;
};

export const createPathsBFS = (rootNode, rootNodePos, showPartner) => {
  const queue = [[rootNode, rootNodePos]];

  const nodeComponents = [];

  while (queue.length > 0) {
    const [node, nodePos] = queue.shift();

    let coordinates = [];
    let nodeToShowChildrenFor = null;
    if (showPartner) {
      const partnerNode = node.partnerNodes[node.partnerToDisplay];
      nodeToShowChildrenFor = partnerNode;
    } else {
      nodeToShowChildrenFor = node;
    }

    if (nodeToShowChildrenFor && nodeToShowChildrenFor.children.length > 0) {
      calculateNumberOfNodesLeftAndRight(nodeToShowChildrenFor);

      const children = [
        ...nodeToShowChildrenFor.leftNodes,
        ...nodeToShowChildrenFor.rightNodes,
      ];
      const positionsToDrawNodes = getPositionsToDrawNodes(
        nodeToShowChildrenFor
      );

      coordinates.push(
        ...findCoordinatesForChildren(
          nodePos,
          nodeToShowChildrenFor.numberOfNodesLeft,
          nodeToShowChildrenFor.numberOfNodesRight,
          positionsToDrawNodes,
          children
        )
      );
    }
  }
};

const getPositionsToDrawNodes = (node) => {
  const positionsToDrawNodes = [];
  positionsToDrawNodes.push(...node.leftNodes.map((child) => child.nodePos));
  positionsToDrawNodes.push(...node.rightNodes.map((child) => child.nodePos));
  return positionsToDrawNodes;
};

export const createPaths = (node, nodePos, showPartner, paths = []) => {
  if (!node) {
    return;
  }
  //coordinates of children
  let coordinates = [];

  if (node && node.children.length > 0) {
    let nodeToUseToFindCoordsForChildren = null;
    if (showPartner) {
      nodeToUseToFindCoordsForChildren =
        node.partnerNodes[node.partnerToDisplay];
    } else {
      nodeToUseToFindCoordsForChildren = node;
    }

    calculateNumberOfNodesLeftAndRight(nodeToUseToFindCoordsForChildren);

    const children = [
      ...nodeToUseToFindCoordsForChildren.leftNodes,
      ...nodeToUseToFindCoordsForChildren.rightNodes,
    ];
    const positionsToDrawNodes = getPositionsToDrawNodes(
      nodeToUseToFindCoordsForChildren
    );

    coordinates.push(
      ...findCoordinatesForChildren(
        nodePos,
        nodeToUseToFindCoordsForChildren.numberOfNodesLeft,
        nodeToUseToFindCoordsForChildren.numberOfNodesRight,
        positionsToDrawNodes,
        children
      )
    );
  }
  //circle svg of the node
  const nodeComp = (
    <NodeComp node={node} nodePos={nodePos} isPartner={false}></NodeComp>
  );

  paths.push(nodeComp);

  if (node.partners.length > 0 && showPartner) {
    const partnerNode = node.partnerNodes[node.partnerToDisplay];
    const partnerNodePos = [nodePos[0] + 30, nodePos[1]];
    const partnerNodeComp = (
      <NodeComp
        node={partnerNode}
        nodePos={partnerNodePos}
        isPartner={true}
      ></NodeComp>
    );
    paths.push(partnerNodeComp);
  }

  coordinates.forEach((coord) => {
    const firstControlPointX = Math.abs(
      (parseInt(nodePos[0]) + parseInt(coord[0])) / 2
    );
    const firstControlPointY = parseInt(nodePos[1]) + HEIGHT / 2;
    const secondControlPointX = coord[0];
    const secondControlPointY = coord[1] - 70;

    createPaths(coord[2], coord, showPartner, paths);
    const path = (
      <path
        key={nodePos[0] + nodePos[1] + coord[0] + coord[1]}
        d={`M${nodePos[0]} ${nodePos[1]} C${String(
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

export const createPathsCircle = (nodes, centerPos) => {
  evenlySpaceNodesAroundCircle(centerPos[0], centerPos[1], nodes, RADIUS);
  const paths = [];

  nodes.forEach((node) => {
    node.relationships.forEach((relationship) => {
      const path = (
        <line
          x1={relationship.relationNode.circlePos[0]}
          y1={relationship.relationNode.circlePos[1]}
          x2={node.circlePos[0]}
          y2={node.circlePos[1]}
          stroke="black"
          stroke-width="2"
        />
      );
      paths.push(path);
    });
  });

  nodes.forEach((node) => {
    paths.push(
      <NodeComp
        node={node}
        nodePos={node.circlePos}
        isPartner={false}
      ></NodeComp>
    );
  });

  return paths;
};
