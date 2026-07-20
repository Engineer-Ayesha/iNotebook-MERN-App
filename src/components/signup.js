import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
function Signup(props) {
  const navigate=useNavigate();
  const [fields,setFields]=useState({username:"",email:"",password:"",confirmpassword:""});
  const [errors, setErrors] = useState({});
  const handleChange=(e)=>{
      const {value,name}=e.target
      setFields((prevField)=>({
        ...prevField,
        [name]:value
      }))
    }
    let host = "https://inotebook-mern-app-production.up.railway.app";
    const handleSubmit= async (e)=>{
      e.preventDefault();
      const response = await fetch(`${host}/api/userRoute/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:fields.username,email:fields.email,password:fields.password}),
    });
    const json= await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem("token",json.authToken);
      navigate("/");
      props.alertFun("User registered Succesffully","success");
    }else{
      setErrors(json.message);
      props.alertFun(json.message,"danger");
    }
    let errors={};
    if(fields.username===""||fields.username.length<3){
      errors.username="Please enter valid name";
    }
    if(fields.email===""){
      errors.email="Please enter email";
    }
    if(fields.password===""||fields.password.length<5){
      errors.password="Please enter at least 5 characters";
    }
    if(fields.confirmpassword===""){
      errors.confirmpassword="Please confirm password";
    }
    setErrors(errors);
    }
  return (
    <div>
      <div className="w-50 mx-auto">
        <h2 className="mb-4" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Create an account  to use iNotebook</h2>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Enter Name</label>
    {errors.username && <p style={{color:"red"}}>{errors.username}</p> }
    <input type="name"  className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}  id="name" aria-describedby="emailHelp" placeholder='Enter name' name='username' value={fields.username} onChange={handleChange} style={{border:errors.username?"1px solid red":"1px solid #dee2e6"}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Email address</label>
    {errors.email && <p style={{color:"red"}}>{errors.email}</p> }
    <input type="email"  className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}  id="email" aria-describedby="emailHelp" placeholder='Enter email' name="email" value={fields.email} onChange={handleChange} style={{border:errors.email?"1px solid red":"1px solid #dee2e6"}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Password</label>
    {errors.password && <p style={{color:"red"}}>{errors.password}</p> }
    <input type="password"  className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}  id="password" name="password" value={fields.password} onChange={handleChange} placeholder='Enter password' style={{border:errors.email?"1px solid red":"1px solid #dee2e6"}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Confirm Password</label>
    {errors.confirmpassword && <p style={{color:"red"}}>{errors.confirmpassword}</p> }
    <input type="confirmpassword"  className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}  id="confirmpassword" name="confirmpassword" value={fields.confirmpassword} placeholder='Confirm password' onChange={handleChange} style={{border:errors.email?"1px solid red":"1px solid #dee2e6"}}/>
  </div>
  
  <button type="submit" className="btn btn-primary my-3">Submit</button>
</form>
      </div>
    </div>
  )
}

export default Signup