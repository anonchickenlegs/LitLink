import React, { useState, useEffect } from "react";
import Tree from "./tree";
import NodeForm from "./nodeForm";
import { fetchFamilyTree } from "./utils_api";

const HomePage = () => {
  const [familyData, setFamilyData] = useState(null);
  const [showPartner, setShowPartner] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/family_members/88/family_tree", {
            method: "GET",
            mode: "cors",
          }
        );  

        const data = await response.json();
        setFamilyData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {familyData && <Tree rootObj={familyData} showPartner={showPartner}></Tree>}
      <NodeForm></NodeForm>
      <button type="button" onClick={() => setShowPartner(!showPartner)}>show partner</button>
    </div>
  );
};

export default HomePage;
