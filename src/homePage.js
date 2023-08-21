import React, { useState, useEffect } from "react";
import Tree from "./tree";

const HomePage = () => {
  const [familyData, setFamilyData] = useState(null);

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
        debugger
        setFamilyData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      {familyData && <Tree rootObj={familyData}></Tree>}
    </div>
  );
};

export default HomePage;
