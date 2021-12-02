import React from "react";
import "../Css/Input.css";

function Input({ inputTitle, type, placeholder, state, setState }) {
  return (
    <>
      <h3 className="title">{inputTitle}</h3>
      <input
        className={type === "text" ? "text-input" : "checkbox"}
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={
          type === "text"
            ? (e) => setState(e.target.value)
            : (e) => setState(e.currentTarget.checked)
        }
        checked={state}
      />
    </>
  );
}

export default Input;
