import React, { useState, useEffect } from "react";
import Header from "./Components/Header.js";
import ProjectsContainer from "./Components/ProjectsContainer.js";
import AddNewProject from "./Components/AddNewProject.js";
import "./Css/App.css";

// // // // // // // // // // // // // //
// PS: Remove Json-Server from the npm packet after testing
// PS: Delete the db.json file
// PS: Remove the comand server from the package.json
// // // // // // // // // // // // // //

function App() {
  const [showAddProject, setBoolAddProject] = useState(false);
  const [showEditField, setObjEditField] = useState({});
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const dataFromServer = await fetchProjects();
      setProjects(dataFromServer);
    };

    getProjects();
  }, []); // Always remember this second parameter on the useEffect Method

  // Fetch the all projects inside the API
  const fetchProjects = async () => {
    const url = "http://localhost:5000/projects";
    const promisseData = await fetch(url);
    const data = await promisseData.json();

    return data;
  };

  // Fetch the specified Project with the Id in the API
  const fetchProject = async (id) => {
    const url = `http://localhost:5000/projects/${id}`;
    const promisseData = await fetch(url);
    const data = await promisseData.json();
    return data;
  };

  // Delete a selected Project
  const deleteProject = async (id) => {
    await fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
    });

    setProjects(projects.filter((proj) => proj.id !== id));
  };

  // Add a new project to the API
  const addProject = async (project) => {
    const res = await fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    const data = await res.json();

    setProjects([...projects, data]);
  };

  // Edit name and description
  const editName = (currentValue, newValue) => {
    return newValue
      ? (currentValue = { ...currentValue, name: newValue })
      : console.warn("Please add a new value");
  };
  const editDescription = (currentValue, newValue) => {
    return newValue
      ? (currentValue = { ...currentValue, description: newValue })
      : console.warn("Please add a new value");
  };

  const togglePriority = (currentValue, newValue) => {
    return (currentValue = { ...currentValue, priority: newValue });
  };

  // Main Function that changes the data inside the State and on the DataBase
  const editValue = async ({ id, newValue, element }) => {
    let updProject;

    // Get selected Project from server and update locally
    const projectFromServer = await fetchProject(id);

    if (!element) return; // Guard Clause

    // Change Name, Description or priority dinamically
    if (element.id === `id-name--${id}`)
      updProject = await editName(projectFromServer, newValue);
    if (element.id === `id-description--${id}`)
      updProject = await editDescription(projectFromServer, newValue);
    if (element.id === `id-priority--${id}`)
      updProject = await togglePriority(projectFromServer, newValue);

    // Send it to the server
    const request = await fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updProject),
    });

    const newData = await request.json();

    // set the new value in the useState
    setProjects(
      projects.map((proj) => (proj.id === id ? { ...newData } : proj))
    );

    setObjEditField({ id: id, edit: false });
  };

  return (
    <div className="app">
      <Header
        onBtnClick={() => setBoolAddProject(!showAddProject)}
        showAddProject={showAddProject}
      />
      {showAddProject ? (
        <AddNewProject
          addProject={addProject}
          setBoolAddProject={setBoolAddProject}
        />
      ) : (
        ""
      )}
      <h2>
        Total Projects: <span>{projects.length}</span>
      </h2>
      <ProjectsContainer
        projects={projects}
        editValue={editValue}
        showEditField={showEditField}
        setObjEditField={setObjEditField}
        deleteProject={deleteProject}
      />
    </div>
  );
}

export default App;
/*
 TEST DATA

{
  "id": 1,
  "name": "Projeto Um",
  "description": "Descrição do Projeto Um",
  "priority" : false,
},
{
  "id": 2,
  "name": "Projeto Dois",
  "description": "Descrição do Projeto Dois",
  "priority" : false
},
{
  "id": 3,
  "name": "Projeto Três",
  "description": "Descrição do Projeto Três",
  "priority" : true
}

*/
