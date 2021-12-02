import React, { useState } from "react";
import Input from "./Input.js";
import "../Css/App.css";
import "../Css/AddNewProject.css";

function AddNewProject({ addProject, setBoolAddProject }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!name || !description) {
      return;
    }

    addProject({ name, description, priority });

    setName("");
    setDescription("");
    setPriority(false);
    setBoolAddProject(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="add-new-project">
        <Input
          type="text"
          inputTitle="Project Name"
          placeholder="Define the project name"
          state={name}
          setState={setName}
        />
        <Input
          type="text"
          inputTitle="Description"
          placeholder="Write a little about the project"
          state={description}
          setState={setDescription}
        />
        <Input
          type="checkbox"
          inputTitle="Max Priority"
          state={priority}
          setState={setPriority}
        />
        <button className="btn--black btn--submit" type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
}

export default AddNewProject;
