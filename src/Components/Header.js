import React from "react";
import "../Css/App.css";
import "../Css/Header.css";

function Header({ onBtnClick, showAddProject }) {
  return (
    <div className="container">
      <h1 className="title--main">Project Management</h1>
      <button className="btn--black" onClick={onBtnClick}>
        {!showAddProject ? "Add New Project" : "Please, No more Projects"}
      </button>
    </div>
  );
}

export default Header;
