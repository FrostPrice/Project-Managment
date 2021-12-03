import React, { useState } from "react";
import "../Css/App.css";
import "../Css/EditInput.css";

function EditInput({ id, editValue, currentElement }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="text--edit-value">
        {currentElement.id === `id-name--${id}`
          ? "Project Name"
          : "Project Description"}
      </p>
      <div className="container--edit">
        <input
          id={`id-input--${id}`}
          className={"input--default"}
          placeholder={`Change the Project ${
            currentElement.id === `id-name--${id}` ? "Name" : "Description"
          }. Press ENTER to confirm`}
          onChange={(event) => setValue(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter"
              ? editValue({ id: id, newValue: value, element: currentElement })
              : ""
          }
        />
        <button
          className="btn--confirm"
          onClick={() => {
            editValue({ id: id, newValue: value, element: currentElement });
          }}
        >
          Confirm
        </button>
      </div>
    </>
  );
}

export default EditInput;
