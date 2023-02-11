import React, { useState,useEffect } from 'react'
import {NavLink, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import Swal from 'sweetalert2'

import './Register.css'
const Register = () => {
    
    const [w,inc]=useState("40%");

    useEffect(() => {
        if( window.innerWidth<900)
       
            inc("300px")

      }, [])

    const [formData,setData]=useState({
        username:"",
        email:"",
        password:"",
        confirmpass:""
    })
    const navigate=useNavigate();
 
    const handleSubmit=async(e)=>{
         e.preventDefault();
         const {username,email,password,confirmpass}=formData;
          
         if(password!==confirmpass){
            Swal.fire({
                title: 'Password must be same',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
            return;
         }
         
         const res=await fetch("/registerData",{
             method:"POST",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                username,email,password,confirmpass
            })
         })
         const data=await res.json();
         
         if(data.error==="emailrejected"){
            Swal.fire({
                title: 'Invalid Email',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
         }
         else if(data.error==="UserExist"){
            Swal.fire({
                title: 'User Already Exist',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
         }
         else if(data.error==="passwordrejected"){
            Swal.fire({
                title: 'Invalid Password',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
        }
         else{
            Swal.fire({
                title: 'Successfully Register',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
             setData({username:"",email:"",password:"",confirmpass:""})
             navigate("/Login")
         }
     
    
      return ;
    }

    const change=(e)=>{
            const name=e.target.name;
            const value=e.target.value;
            setData({...formData,[name]:value})
    }

    return (
        <div className='background'>
            <div className="container text-center" style={{flexGrow:"1"}}>
                <h1>Register</h1>
            </div>

            <div className="container  bg-light my-2 mx-auto border" style={{width:w,zIndex:3}}>
                <form method="POST" className="form py-4" onSubmit={handleSubmit}>
                    <label className="form-label m-1">Name</label><input type="text" className="form-control " name="username" value={formData.username} placeholder="Enter your name" required onChange={change}/>               
                    <label className="form-label my-2">Email</label><input type="email"  name="email" value={formData.email} className="form-control " placeholder="Enter your email" required onChange={change} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small><br/>
                    <label className="form-label my-2">Password</label><input type="password"  name="password" value={formData.password} className="form-control " placeholder="Enter your password" required onChange={change}/>
                    <small id="PasswordHelp" className="form-text text-muted">Password is remain always safe.</small><br/>
                    <label className="form-label my-2">Confirm Password</label><input type="password"  name="confirmpass" value={formData.confirmpass} className="form-control " placeholder="Enter your password again" required onChange={change}/>
                    <small id="PasswordHelp" className="form-text text-muted">Password is remain always safe.</small><br/>
                    <small id="PasswordHelp" className="form-text text-muted">Already have an account</small> <NavLink to='/Login' className='form-text text-danger'>Click here</NavLink><br/>
                    <div className="my-3 text-center"><button className="btn btn-danger form-control" type="submit">Register</button></div>
                </form>
            </div>
           
        </div>
    )
}

export default Register
