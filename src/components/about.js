import React from 'react'

function About(props) {
  return (
    <div>
      <div className="w-50 mx-auto ">
        <h2 style={{ color: props.bgcolor === "white" ? "black" : "white",textAlign:"center" }}>About iNoteBook</h2>
        <div className="container my-3">
          <h4 style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Welcome to iNoteBook</h4>
          <p style={{ color: props.bgcolor === "white" ? "black" : "white" }}>iNotebook is a secure cloud-based notes application built using the MERN Stack. It allows users to create, update, delete, and organize their personal notes from anywhere.</p>
        </div>
        <div className="container">
          <h4 style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Features</h4>
          <ul className='my-3' style={{listStyle:"none"}}>
            <li  className='my-2' style={{ color: props.bgcolor === "white" ? "black" : "white" }}><i style={{fontSize:"18px",color:"#0D6EFD"}} className="fa-solid fa-pen-to-square me-3 "></i>Create and save notes</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }} className='my-2'><i style={{fontSize:"18px",color:"#FD7E14"}} className="fa-solid fa-pencil me-3"></i>Edit existing notes</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }} className='my-2'><i style={{fontSize:"18px",color:"#DC3545"}} className="fa-solid fa-trash-can me-3"></i>Delete unwanted notes</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }} className='my-2'><i style={{fontSize:"18px",color:"#198754"}} className="fa-solid fa-lock me-3"></i>Secure user authentication</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }} className='my-2'><i style={{fontSize:"18px",color:"#6F42C1"}} className="fa-solid fa-user me-3"></i>Personal notes for every user</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }} className='my-2'><i style={{fontSize:"18px",color:"#FFC107"}} className="fa-solid fa-bolt me-3"></i>Fast and responsive interface</li>
          </ul>
        </div>
        <div className="container">
          <h4 style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Technologies Used</h4>
          <ul>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }}>React.js</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Node.js</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Express.js</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }}>MongoDB</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Bootstrap 5</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }}>JWT Authentication</li>
          </ul>
        </div>
        <div className="container">
          <h4 style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Why iNotebook?</h4>
          <p style={{ color: props.bgcolor === "white" ? "black" : "white" }}>iNotebook helps you keep your important ideas, reminders, and tasks organized in one secure place. Your notes are accessible only after login, ensuring privacy and security.</p>
        </div>
        <div className="container">
          <h4 style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Future Improvements</h4>
          <ul className='my-3' style={{listStyle:"none"}}>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }} className='my-2'><i style={{fontSize:"18px",color:"#0D6EFD"}} className="fa-solid fa-magnifying-glass me-3 "></i> Search Notes</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }} className='my-2'><i style={{fontSize:"18px",color:"#20C997"}} className="fa-solid fa-tag me-3"></i> Filter by Tags</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }} className='my-2'><i style={{fontSize:"18px",color:"#DC3545"}} className="fa-solid fa-map-pin me-3 "></i> Pin Important Notes</li>
            <li style={{ color: props.bgcolor === "white" ? "black" : "white" }} className='my-2'><i style={{fontSize:"18px",color:"#6610F2"}} className="fa-regular fa-calendar-days me-3 "></i> Sort by Date</li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default About