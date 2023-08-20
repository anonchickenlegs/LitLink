import React from "react";
import "./App.css";
import Tree from "./tree";

function App() {
  const createRootNode = () => {
    return {
      id: 1,
      name: "Virginia",
      partners: [
        {
          id: 2,
          name: "Franco",
          children: [
            {
              id: 3,
              name: "Manuela",
              children: [],
              partners: [
                {
                  id: 78,
                  name: "david",
                  children: [],
                },
              ],
            },
            {
              id: 3,
              name: "Manuela",
              children: [],
              partners: [
                {
                  id: 78,
                  name: "david",
                  children: [
                    { id: 3, name: "banana", children: [], partners: [] },
                    { id: 3, name: "banana", children: [], partners: [] },
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 5,
          name: "Navarro",
          children: [{ id: 4, name: "Leon", children: [], partners: [] }],
        },
      ],
      children: [],
    };
  };

  return (
    <div className="App">
      <Tree rootObj={createRootNode()}></Tree>
    </div>
  );
}

export default App;
