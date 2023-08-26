import React from "react";
import Graph from "react-graph-vis";

const GraphTree = () => {
  const data = [
    {
      name: "A",
      children: [
        {
          name: "B",
        },
        {
          name: "C",
        },
      ],
    },
    {
      name: "D",
      children: [
        {
          name: "E",
        },
        {
          name: "F",
        },
      ],
    },
  ];

  return <Graph data={data} width={500} height={500} layout="force" />;
};

export default GraphTree;
