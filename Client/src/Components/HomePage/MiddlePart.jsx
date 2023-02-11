import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Home.css'
const MiddlePart = () => {
const [change,setchange]=useState(false);
  useEffect(()=>{
       const checkLogin=sessionStorage.getItem("login");
       const email=sessionStorage.getItem("email")
       if(checkLogin==="true"){
            setchange(true);
       }
  },[])
  const LoginFirst=()=>{
       
     Swal.fire({
          title: 'Login First',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
  }
  return (
      <div className='container  w-75 bg-light topMargin'>
           <h1 style={{fontSize:"6vw"}}>Medium is a Place to write,read, and connect</h1>

           <p className='mt-3'>It's easy and free  to post your thinking on any topic and connect with millions of readers</p>

           {change==true?<NavLink to="/WriteStory"><button className='btn btn-outline-dark mt-3'>Start Writing</button></NavLink>
           :<button className='btn btn-outline-dark mt-3' onClick={LoginFirst}>Start Writing</button>}
          
      </div>
  )
}

export default MiddlePart