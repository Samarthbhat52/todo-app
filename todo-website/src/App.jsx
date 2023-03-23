import { useState } from "react";
import { nanoid } from "nanoid";
import Notes from "../components/Notes";
import { createContext } from "react";

export const ThemeContext = createContext(null);

export default function App() {
  // Variable and state declarations

  const defaultValues = {
    isChanged: false,
    id: getRandomId(),
    body: "",
    completed: false,
    page: "all",
  };

  const [formData, setFormData] = useState(defaultValues);
  const [newNote, setNewNote] = useState([]);
  const [pageVal, setPageVal] = useState("all");
  const [theme, setTheme] = useState("dark");

  function themeToggle() {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  }

  function getRandomId() {
    return nanoid();
  }

  // Functions to handle the different tasks

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
          return {
            ...checkbox,
            isChanged: !checkbox.isChanged,
            completed: !checkbox.completed,
          };
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

  function deleteCompleted(event) {
    event.stopPropagation();
    setNewNote((oldNote) =>
      oldNote.filter((note) => note.isChanged !== true)
    );
  }

  function notesCount() {
    const notesCount = newNote.filter((item) => item.isChanged === false);
    return notesCount.length;
  }

  function handlePages(value) {
    setPageVal(value);
  }

  if(theme === "dark"){
    document.body.classList.add("bg-dark")
    document.body.classList.remove("bg-light")
  }else if(theme === "light"){
    document.body.classList.add("bg-light");
    document.body.classList.remove("bg-dark");
  }

  // HTML Component

  return (
    <ThemeContext.Provider value={{theme}}>
      <div id={theme}>
        <div className="header | flex">
          <h1 className="text-light fw-700">TODO</h1>
          <div>
            <img
              onClick={themeToggle}
              src={
                theme === "dark"
                  ? "../todo-app-main/images/icon-sun.svg"
                  : "../todo-app-main/images/icon-moon.svg"
              }
              alt="Light/dark-mode-icon"
            />
          </div>
        </div>

        <div>
          <form
            onSubmit={handleSubmit}
            className={
              newNote.length === 0
                ? "input | flex bg-list-dark"
                : "input input--more | flex bg-list-dark"
            }
          >
            <button className="button | btn"></button>
            <input
              className="enter text-light"
              type="text"
              placeholder="Create a new todo..."
              name="body"
              onChange={handleForm}
            />
          </form>
        </div>

        <div className="checkbox | text-list-dark flex bg-list-dark fw-400">
          {pageVal === "all" &&
            newNote.map((checkbox) => (
              <Notes
                key={checkbox.id}
                id={checkbox.id}
                isChanged={checkbox.isChanged}
                body={checkbox.body}
                handleCheckboxChange={() => handleCheckboxChange(checkbox.id)}
                deleteNote={deleteNote}
              />
            ))}

          {pageVal === "active" &&
            newNote.map(
              (checkbox) =>
                checkbox.completed !== true && (
                  <Notes
                    key={checkbox.id}
                    id={checkbox.id}
                    isChanged={checkbox.isChanged}
                    body={checkbox.body}
                    handleCheckboxChange={() =>
                      handleCheckboxChange(checkbox.id)
                    }
                    deleteNote={deleteNote}
                  />
                )
            )}

          {pageVal === "completed" &&
            newNote.map(
              (checkbox) =>
                checkbox.completed && (
                  <Notes
                    key={checkbox.id}
                    id={checkbox.id}
                    isChanged={checkbox.isChanged}
                    body={checkbox.body}
                    handleCheckboxChange={() =>
                      handleCheckboxChange(checkbox.id)
                    }
                    deleteNote={deleteNote}
                  />
                )
            )}

          <div className="checkbox--container footer | flex text-grey-dark bg-list-dark">
            <p>{`${notesCount()} items left`}</p>
            <div className="status-toggle | flex fw-700">
              <p>
                <button
                  className={pageVal === "all" ? "active-page" : "pseudo"}
                  onClick={() => handlePages("all")}
                >
                  All
                </button>
              </p>
              <p>
                <button
                  className={pageVal === "active" ? "active-page" : "pseudo"}
                  onClick={() => handlePages("active")}
                >
                  Active
                </button>
              </p>
              <p>
                <button
                  className={pageVal === "completed" ? "active-page" : "pseudo"}
                  onClick={() => handlePages("completed")}
                >
                  Completed
                </button>
              </p>
            </div>
            <p>
              <button className="clearComp" onClick={deleteCompleted}>
                Clear Completed
              </button>
            </p>
          </div>
        </div>

        <div className="status-toggle-mobile | text-list-dark flex bg-list-dark text-grey-dark fw-700">
          <p>
            <button
              className={pageVal === "all" ? "active-page" : "pseudo"}
              onClick={() => handlePages("all")}
            >
              All
            </button>
          </p>
          <p>
            <button
              className={pageVal === "active" ? "active-page" : "pseudo"}
              onClick={() => handlePages("active")}
            >
              Active
            </button>
          </p>
          <p>
            <button
              className={pageVal === "completed" ? "active-page" : "pseudo"}
              onClick={() => handlePages("completed")}
            >
              Completed
            </button>
          </p>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
