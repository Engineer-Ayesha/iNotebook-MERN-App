import NotesContext from "../context/notes/noteContext";
import { useContext } from "react";
import { useEffect,useState,useRef } from "react";
import NotesItem from "./notesItem";
import { useNavigate } from "react-router-dom";
function MyNotes(props) {
  let navigate=useNavigate();
  const context = useContext(NotesContext);
  const { notes, initialNotes,updateNote } = context;
  
  useEffect(() => {
    if(localStorage.getItem("authToken")){
      initialNotes();
    }else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const[note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});
  const editNote=(currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }
    const handleChange=(e)=>{
      const {value,name}=e.target
      setNote((prevNote)=>({
        ...prevNote,
        [name]:value
      }))
    }
    const handleClick=(e)=>{
    e.preventDefault();
    updateNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.alertFun("Note Updated successfully","success");
  }
  return (
    <div>
      <div className=" w-50 mx-auto">
        <button
        type="button" ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Note
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" >
          <div className="modal-content" style={{backgroundColor: props.bgcolor === "white" ? "#FFFFFF" : "#1F1F1F"}}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>
                Edit Note
              </h1>
              <button
                type="button"
                className={`btn-close ${
    props.bgcolor === "black" ? "btn-close-white" : ""
  }`}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>
            Title
            </label>
            <input
              type="text"
              className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}
              id="etitle"
              placeholder="Enter title"
              name="etitle" value={note.etitle} onChange={handleChange}
            />
          </div>
          <label htmlFor="edescription" className="form-label" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>
            Description
          </label>
          <input
            type="text"
            id="edescription"
            className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}
            aria-describedby="passwordHelpBlock"
            placeholder="Enter description"
            name="edescription" value={note.edescription} onChange={handleChange}
          />
          <label htmlFor="etag" className="form-label my-2" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>
            Tag
          </label>
          <input
            type="text"
            id="etag"
            className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}
            aria-describedby="passwordHelpBlock"
            placeholder="Enter tag"
            name="etag" value={note.etag} onChange={handleChange}
          />
        </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal" ref={refClose}
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>
        <h3 style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Your Notes</h3>
        {notes.length === 0 && <span style={{ color: props.bgcolor === "white" ? "black" : "white" }}>No Notes to display</span>}
        <div className="row">
          {notes.map((note) => {
            return (
              <div className="col-md-6" key={note._id}>
                <NotesItem bgcolor={props.bgcolor} alertFun={props.alertFun} editNote={editNote} note={note} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MyNotes;
