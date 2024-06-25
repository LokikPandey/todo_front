import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, server } from "../main";
import toast from "react-hot-toast";

const Login = ()=> {
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const {isAuthenticated,setIsAuthenticated} = useContext(Context);
  const {isLoading ,setIsLoading} = useContext(Context);
  const submitHandler = async (e) => {

    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    
      toast.success(data.message);
      setIsAuthenticated(true);
      setIsLoading(false);
    }

    catch(error)
    {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }
    if(isAuthenticated) return <Navigate to={"/"}/>;

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button disabled= {isLoading} type='submit'>Login</button>
          <h4>or</h4>
          <Link to="/register">Sign up</Link>
        </form>
      </section>
    </div>
  )

}

export default Login;