import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login(props) {
  const [errors, setErrors] = useState({});
  const [fields,setFields]=useState({email:"",password:""});
  let navigate=useNavigate();

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
    const response = await fetch(`${host}/api/userRoute/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:fields.email,password:fields.password }),
    });
    const json= await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
      props.alertFun("User Logged Succesffully","success");
    }else{
      setErrors(json.error);
      props.alertFun(json.error,"danger");
    }
    let errors={};
    if(fields.email===""){
      errors.email="Please enter correct email"
    }
    if(fields.password===""||fields.password.length<3){
      errors.password="Please enter valid Password"
    }
    setErrors(errors);
  }
  return (
    <div>
      <div className="w-50 mx-auto">
        <h2 className="mb-4" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>Login to continue iNotebook</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>
            Email address
          </label>
          {errors.email && <p style={{color:"red"}}>{errors.email}</p> }
          <input
            type="email"
            className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}
            id="exampleInputEmail1"
            placeholder="Enter email"
            aria-describedby="emailHelp" name="email" value={fields.email} onChange={handleChange} style={{border:errors.email?"1px solid red":"1px solid #dee2e6"}}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: props.bgcolor === "white" ? "black" : "white" }}>
            Password
          </label>
          {errors.password && <p style={{color:"red"}}>{errors.password}</p> }
          <input
            type="password"
            className={`form-control ${props.bgcolor === "white" ? "light-input" : "dark-input"}`}
            placeholder="Enter password"
            id="exampleInputPassword1" name="password" value={fields.password} onChange={handleChange} style={{border:errors.password?"1px solid red":"1px solid #dee2e6"}}
          />
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>

      </div>
      
    </div>
  );
}

export default Login;
