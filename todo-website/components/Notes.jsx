import React from "react";

export default function Notes({
  id,
  isChanged,
  body,
  handleCheckboxChange,
  deleteNote,
}) {
  return (
    <div className="checkbox--container | flex" key={id}>
      <div
        className={isChanged ? "checkmark--click | btn" : "checkmark | btn"}
        id={id}
        onClick={handleCheckboxChange}
      ></div>
      <p className={isChanged ? "btn--click | todo-content" : "pseudo | todo-content"}>{body}</p>
      <img
        className="del-icon"
        src="../todo-app-main/images/icon-cross.svg"
        onClick={(event) => deleteNote(event, id)}
      />
    </div>
  );
}
