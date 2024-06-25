import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'
import toast from 'react-hot-toast';
import axios from 'axios'
import { server } from '../main';
function Header() {
  const  {isAuthenticated,setIsAuthenticated} =useContext(Context);

  const logoutHandler = async ()=>{
  try {
    const { data } = await axios.get(
      `${server}/user/logout`,
      {
        withCredentials: true,
      }
    );
  
    toast.success(data.message);
    setIsAuthenticated(false);
  }

  catch(error)
  {
    toast.error(error.response.data.message);
    setIsAuthenticated(true);
  }
}


  return (
    <nav className='header'>
        <div><h2>Todo App.</h2></div>
        <article>
            <Link to={"/"}>Home</Link>
            <Link to={"/profile"}>Profile</Link>

            {
              isAuthenticated ? <button className='btn' onClick={logoutHandler}>Logout</button>
              :            <Link to={"/login"}>Login</Link>

            }

            {/* <Link to={"/register"}>Register</Link> */}
        </article>
    </nav>
  )
}

export default Header