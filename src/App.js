import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import About from './components/about';
import Master from './components/master';
import NotesState from './context/notes/noteState';
import Alert from './components/Alert';
import Login from './components/login';
import Signup from './components/signup';
import { useState } from 'react';
function App() {
  const[color,setColor]=useState("white");
  const[alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    },1500);
  }
  const result=()=>{
    if(color==="white"){
      setColor('black');
      document.body.style.backgroundColor='black';
      showAlert("Dark mode Enabled","success");
    }else{
      setColor('white');
      document.body.style.backgroundColor='white';
      showAlert("Light mode Enabled","success");
    }
  }
  return (
    <>
    <NotesState>
    <BrowserRouter>
    <Navbar toggle={result} bgcolor={color} />
    <Alert bgcolor={color} text={alert} />
    <Routes>
      <Route exact path='/' element={<Master/>}>
         <Route  index element={<Home bgcolor={color} alertFun={showAlert}/>}/>
         <Route exact path="/about" element={<About bgcolor={color}/>}/>
         <Route exact path="/login"  element={<Login bgcolor={color} alertFun={showAlert}/>}/>
         <Route exact path="/signup" element={<Signup bgcolor={color} alertFun={showAlert}/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </NotesState>
    </>
  );
}

export default App;
