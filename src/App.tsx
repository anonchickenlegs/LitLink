import React from 'react';
import './App.css';
import Tree from './tree'

function App() {

  const createFakeTree = () => {
    return {
      name: "Virginia",
      children: [
        {
          name: "Manuela",
          children: [{name: "sandra", children:[{},{}]}, {}, {}],
        },
        {
          name: "Leon",
          children: [{}, {}, {}],
        },
        // { name: "Santa", children: [{}, {}, {}] },
        // { name: "Felipe", children: [{}, {}, {}] },
        // { name: "Alejandra", children: [] },
        // { name: "Maria", children: [{}, {}, {}] },
        // { name: "Jovita", children: [] },
        // { name: "Conchita", children: [{}, {}, {}] },
        // { name: "Angelita", children: [{}, {}] },
      ],
    };
  }


  return (
    <div className="App">
      <Tree
        className="treeWrapper"
        data={createFakeTree()}
      ></Tree>;
    </div>
  );
}

export default App;
