import { useState } from "react";
import { nanoid } from "nanoid";
import Notes from "../components/Notes";

export default function App() {
  const defaultValues = {
    isChanged: false,
    id: getRandomId(),
    body: "",
  };

  const [formData, setFormData] = useState(defaultValues);
  const [newNote, setNewNote] = useState([]);

  function getRandomId() {
    return nanoid();
  }

  function handleForm(event) {
    const { name, value } = event.target;
    if (value !== "") {
      setFormData((oldVal) => {
        return {
          ...oldVal,
          [name]: value,
        };
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    formData.body !== "" && setNewNote((value) => [...value, formData]);
    setFormData(defaultValues);
    event.target.reset();
  }

  const handleCheckboxChange = (id) => {
    setNewNote((prevState) => {
      return prevState.map((checkbox) => {
        if (checkbox.id === id) {
          return { ...checkbox, isChanged: !checkbox.isChanged };
        } else {
          return checkbox;
        }
      });
    });
  };

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNewNote((oldNote) => oldNote.filter((note) => note.id !== noteId));
  }

  function notesCount() {
    const notesCount = newNote.filter((item) => item.isChanged === false);
    return notesCount.length;
  }

  return (
    <div>
      <div className="header | flex">
        <h1 className="text-light fw-700">TODO</h1>
        <div>
          <img
            src="../todo-app-main/images/icon-sun.svg"
            alt="Light-mode-icon"
          />
        </div>
      </div>

      <div>
        <form
          onSubmit={handleSubmit}
          className={
            newNote.length === 0
              ? "input | flex bg-list-dark"
              : "input--more | flex bg-list-dark"
          }
        >
          <button className="button | btn"></button>
          <input
            className="enter text-light"
            type="text"
            placeholder="type your note.."
            name="body"
            onChange={handleForm}
          />
        </form>
      </div>

      <div className="checkbox | text-list flex bg-list-dark">
        {newNote.map((checkbox) => (
          <Notes
            key={checkbox.id}
            id={checkbox.id}
            isChanged={checkbox.isChanged}
            body={checkbox.body}
            handleCheckboxChange={() => handleCheckboxChange(checkbox.id)}
            deleteNote={deleteNote}
          />
        ))}

        <div className="checkbox--container footer | flex text-grey bg-list-dark">
          <p>{`${notesCount()} items left`}</p>
          <div className="status-toggle | flex">
            <p>All</p>
            <p>Active</p>
            <p>Completed</p>
          </div>
          <p>Clear Completed</p>
        </div>
      </div>

      <div className="status-toggle-mobile | text-list flex bg-list-dark text-grey">
        <p>All</p>
        <p>Active</p>
        <p>Completed</p>
      </div>
    </div>
  );
}
