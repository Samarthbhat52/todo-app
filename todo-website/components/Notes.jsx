import React from "react";

export default function Notes({
  id,
  isChanged,
  body,
  handleCheckboxChange,
  deleteNote,
}) {
  let styles = {};

  if (isChanged === true) {
    styles = {
      textDecoration: "line-through",
      color: "hsl(233, 14%, 35%)",
    };
  }

  return (
    <div className="checkbox--container | flex" key={id}>
      <div
        className={isChanged ? "checkmark--click | btn" : "checkmark | btn"}
        id={id}
        onClick={handleCheckboxChange}
      ></div>
      <p className={isChanged ? "btn--click" : "pseudo"}>{body}</p>
      <img
        className="del-icon"
        src="../todo-app-main/images/icon-cross.svg"
        onClick={(event) => deleteNote(event, id)}
      />
    </div>
  );
}
