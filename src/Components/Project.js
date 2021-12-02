import React, { useState } from "react";
import "../Css/Project.css";
import { ReactComponent as SvgDone } from "../Svg/done.svg";
import EditInput from "./EditInput";

function Project({
  id,
  name,
  description,
  priority,
  editValue,
  showEditField,
  setObjEditField,
  deleteProject,
}) {
  const [currentElement, setCurrentElement] = useState();

  const clickedElement = (e) => {
    setObjEditField({ id: id, edit: true });
    if (showEditField.edit === true) setObjEditField({ id: id, edit: false });

    setCurrentElement(e.target);
  };

  return (
    <>
      <div id={`id--${id}`} className={`project ${priority ? "priority" : ""}`}>
        <div>
          <h3
            id={`id-name--${id}`}
            onClick={(event) => {
              clickedElement(event);
            }}
          >
            {name}
          </h3>
          <p
            id={`id-description--${id}`}
            onClick={(event) => clickedElement(event)}
          >
            {description}
          </p>
        </div>
        <div>a</div>
        <button className="btn--project-done" onClick={() => deleteProject(id)}>
          <SvgDone />
        </button>
      </div>
      {showEditField.id === id && showEditField.edit === true ? (
        <EditInput
          id={id}
          editValue={editValue}
          currentElement={currentElement}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Project;
