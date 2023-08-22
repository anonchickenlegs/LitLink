import React, { useState } from "react";

const NodeForm = ({ onSave }) => {
  const [firstName, setFirstName] = useState("firstname");
  const [lastName, setLastName] = useState("lastname");
  const [gender, setGender] = useState(""); // New state for gender
  const [nickname, setNickname] = useState(""); // New state for nickname

  const handleSaveClick = (event) => {
    event.preventDefault();
    onSave(firstName, lastName, gender, nickname); // Pass gender and nickname to onSave
  };

  return (
    <form>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Gender:
        <input
          type="checkbox"
          value="male"
          checked={gender === "male"}
          onChange={(e) => setGender(e.target.checked ? "male" : "female")}
        />
        Male
        <input
          type="checkbox"
          value="female"
          checked={gender === "female"}
          onChange={(e) => setGender(e.target.checked ? "female" : "male")}
        />
        Female
      </label>
      <label>
        Nickname:
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </label>
      <button onClick={handleSaveClick}>Save</button>
    </form>
  );
};

export default NodeForm;
