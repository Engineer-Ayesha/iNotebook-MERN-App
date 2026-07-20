import React from "react";
import MyNotes from "./notes";
import NotesContext from "../context/notes/noteContext";
import { useContext, useState } from "react";
function Home(props) {
  const useNotes = { title: "", description: "", tag: "" };
  const context = useContext(NotesContext);
  const { addNote } = context;
  const [note, setNote] = useState(useNotes);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { value, name } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    let errors = {};
    if (note.title === "" || note.title.length < 3) {
      errors.title = "Title must be at least 3 characters";
    }
    if (note.description === "" || note.description.length < 5) {
      errors.description = "Description must be at least 5 characters";
    }
    if (note.tag === "" || note.tag.length < 3) {
      errors.tag = "Tag must be at least 3 characters";
    }
    setErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    await addNote(note.title, note.description, note.tag);
    setNote(useNotes);
    props.alertFun("Note added successfully", "success");
  };
  return (
    <div>
      <div className="w-50 mx-auto my-3">
        <h3 style={{ color: props.bgcolor === "white" ? "black" : "white" }}>
          Add a Note
        </h3>
        <form className="my-3">
          <div className="mb-3">
            <label
              htmlFor="title"
              className="form-label"
              style={{ color: props.bgcolor === "white" ? "black" : "white" }}
            >
              Title
            </label>
            {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
            <input
              type="text"
              className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}
              id="title"
              placeholder="Enter title"
              name="title"
              value={note.title}
              onChange={handleChange}
              style={{
                border: errors.title ? "1px solid red" : "1px solid #dee2e6",
              }}
            />
          </div>
          <label
            htmlFor="description"
            className="form-label"
            style={{ color: props.bgcolor === "white" ? "black" : "white" }}
          >
            Description
          </label>
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description}</p>
          )}
          <input
            type="text"
            id="description"
            className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}
            aria-describedby="passwordHelpBlock"
            placeholder="Enter description"
            name="description"
            value={note.description}
            onChange={handleChange}
            style={{
              border: errors.description
                ? "1px solid red"
                : "1px solid #dee2e6",
            }}
          />
          <label
            htmlFor="tag"
            className="form-label my-2"
            style={{ color: props.bgcolor === "white" ? "black" : "white" }}
          >
            Tag
          </label>
          {errors.tag && <p style={{ color: "red" }}>{errors.tag}</p>}
          <input
            type="text"
            id="tag"
            className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}
            aria-describedby="passwordHelpBlock"
            placeholder="Enter tag"
            name="tag"
            value={note.tag}
            onChange={handleChange}
            style={{
              border: errors.tag ? "1px solid red" : "1px solid #dee2e6",
            }}
          />

          <button
            type="button"
            className="btn btn-primary my-3"
            onClick={handleClick}
          >
            Add Note
          </button>
        </form>
      </div>
      <MyNotes bgcolor={props.bgcolor} alertFun={props.alertFun} />
    </div>
  );
}

export default Home;
