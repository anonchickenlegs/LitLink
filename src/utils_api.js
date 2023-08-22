export const fetchFamilyTree = async() =>{
  try {
    const response = await fetch(
      "http://localhost:3000/api/family_members/88/family_tree",
      {
        method: "GET",
        mode: "cors",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
