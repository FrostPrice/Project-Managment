import React from "react";
import Project from "./Project.js";

function ProjectsContainer({
  projects,
  editValue,
  showEditField,
  setObjEditField,
  deleteProject,
}) {
  return (
    <>
      {projects.map((proj) => {
        // If no Key is presented in the DataBase, use the index parameter, and the (index + 1) as argument for the Key={}
        return (
          <Project
            key={proj.id}
            id={proj.id}
            name={proj.name}
            description={proj.description}
            priority={proj.priority}
            editValue={editValue}
            showEditField={showEditField}
            setObjEditField={setObjEditField}
            deleteProject={deleteProject}
          />
        );
      })}
    </>
  );
}

export default ProjectsContainer;
