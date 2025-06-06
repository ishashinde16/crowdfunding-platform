import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import axios from "axios"
import { useContext } from "react";
import { UserContext } from "../App.jsx";

const Login = (props) => {
  const [inputs, setInputs] = useState({
    email:"",
    password:"",
  })

  const [err,setError] = useState(null)
  const { email, setEmail } = useContext(UserContext);
  const navigate = useNavigate()

  const handleChange = e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit =async e =>{
    e.preventDefault()
    try{
      setEmail(inputs.email)
      const res = await axios.post("http://localhost:8800/api/auth/login", inputs)
      navigate("/")
      console.log(res)
      
    }
    catch(err){
      setError(err.response.data);
    }
   
  };

  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
        <input required type="text" placeholder='email' name='email' onChange={handleChange}/>
            <input required type="password" placeholder='password' name='password' onChange={handleChange}/>
            <button onClick={handleSubmit}>Login</button>
            {err && <p>{err}</p>}
            <span>Don't have an account? <Link to="/register">Register</Link>
            </span>
        </form>
        </div>
  ) 
}

export default Login