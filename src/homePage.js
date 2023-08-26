import React, { useState, useEffect } from "react";
import Tree from "./tree";
import NodeForm from "./nodeForm";
import { fetchFamilyTree } from "./utils_api";
import GraphTree from "./graph";

const HomePage = () => {
  const [familyData, setFamilyData] = useState(null);
  const [showPartner, setShowPartner] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:3000/api/family_members/88/family_tree", {
  //           method: "GET",
  //           mode: "cors",
  //         }
  //       );  

  //       const data = await response.json();
  //       setFamilyData(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   fetchData();
  // }, []);

  const returnFakeData = () => {
    return {
      characters: [
        { name: "a", bio: "banana" },
        { name: "b", bio: "banana" },
        { name: "c", bio: "banana" },
        { name: "d", bio: "banana" },
        { name: "e", bio: "banana" },
        { name: "f", bio: "banana" },
        { name: "g", bio: "banana" },
        { name: "h", bio: "banana" },
        { name: "i", bio: "banana" },
        { name: "j", bio: "banana" },
        { name: "k", bio: "banana" },
        { name: "l", bio: "banana" },
      ],
      relationships: [
        { character1: "a", character2: "c", description: "buds" },
        { character1: "a", character2: "b", description: "buds" },
        { character1: "b", character2: "k", description: "buds" },
        { character1: "l", character2: "f", description: "buds" },
      ],
    };
  }

  return (
    <div className="App">
      {/* {familyData && (
        <Tree rootObj={familyData} showPartner={showPartner}></Tree>
      )} */}
      <Tree rootObj={returnFakeData()} showPartner={showPartner}></Tree>
      {/* <NodeForm></NodeForm>
      <button type="button" onClick={() => setShowPartner(!showPartner)}>show partner</button> */}
    </div>
  );
};

export default HomePage;
