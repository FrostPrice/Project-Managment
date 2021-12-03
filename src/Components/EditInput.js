import React, { useState } from "react";
import "../Css/App.css";

function EditInput({ id, editValue, currentElement }) {
  const [value, setValue] = useState("");

  return (
    <>
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
    </>
  );
}

export default EditInput;
