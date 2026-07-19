import React from "react";
import NotesContext from "../context/notes/noteContext";
import { useContext } from "react";
function NotesItem(props) {
  const context = useContext(NotesContext);
  const { deleteNote } = context;
  const { note,editNote,alertFun,bgcolor } = props;
  console.log(bgcolor);
console.log(typeof bgcolor);
  return (
    <>
      <div className="card my-2 " style={{
    backgroundColor: bgcolor === "white" ? "#FFFFFF" : "#1F1F1F",
    border: bgcolor === "white" ? "1px solid #DEE2E6" : "1px solid #444"
  }}>
        <div className="card-body">
          <div className="d-flex justify-content-around">
            <h5 className="card-title" style={{ color: bgcolor === "white" ? "black" : "white" }}>{note.title}</h5>
            <div className="d-flex ms-5">
              <i className="fa-solid fa-pen-to-square mt-1  ms-3 " style={{fontSize:"18px",color:"#FD7E14"}}  onClick={()=>{editNote(note)}} ></i>
            <i className="fa-solid fa-trash-can mt-1 ms-3" style={{fontSize:"18px",color:"#DC3545"}} onClick={()=>{deleteNote(note._id);alertFun("Note deleted successfully","success")}}></i>
          </div>
          </div>
          <p className="card-text" style={{ color: bgcolor === "white" ? "black" : "white" }}>{note.description}</p>
          <p className="card-text" style={{ color: bgcolor === "white" ? "black" : "white" }}>{note.tag}</p>
          
        </div>
      </div>
      
      </>
  );
}

export default NotesItem;
