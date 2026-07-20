import React from "react";
import NotesContext from "./noteContext";
import { useState } from "react";
const NotesState = (props) => {
  const host = "https://inotebook-mern-app-production.up.railway.app";

  const initialNotes = async () => {
    const response = await fetch(`${host}/api/notesRoute/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken:
          localStorage.getItem("authToken")
      },
    });
    const json= await response.json();
    console.log(json);
    setNotes(json);
  };

  const [notes, setNotes] = useState([]);
  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notesRoute/createnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken:
          localStorage.getItem("authToken")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json=await response.json();
    console.log(json);
    console.log("note added");
    let note = {
      title: title,
      description: description,
      tag: tag,
    };
    setNotes(notes.concat(note));
  };

  //Update a Note
  //fetching API

  const updateNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notesRoute/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authToken:
          localStorage.getItem("authToken")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json= response.json();
    console.log(json);
    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  //Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notesRoute/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authToken:
          localStorage.getItem("authToken")
      },
      // body: JSON.stringify(data),
    });
    const json= response.json();
    console.log(json);
    console.log("Note is deleted with id", id);
    setNotes(notes.filter((note) => note._id !== id));
  };
  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote ,initialNotes}}>
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesState;
