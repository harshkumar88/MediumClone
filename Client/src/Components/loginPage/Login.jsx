import React, { useState,useEffect } from 'react'
import {NavLink,useNavigate } from 'react-router-dom'
import './Register.css'
import Swal from 'sweetalert2'
const Login = () => {

    const [w,inc]=useState("40%");

    useEffect(() => {
        if( window.innerWidth<900)
       
            inc("300px")
        
      }, [])

    const [formData,setData]=useState({
        username:"",
        email:"",
        password:""
    })
    const navigate=useNavigate();
 
    const handleSubmit=async(e)=>{
         e.preventDefault();
         const {username,email,password}=formData;
         const res=await fetch("/LoginData",{
             method:"POST",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                username,email,password
                 })
         })
         const data=await res.json();
         console.log(data)
         if(data.error==="passwordincorrect"){
            Swal.fire({
                title: 'Password Incorrect',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
         }
         else if( data.error==="UserNotFound"){
            Swal.fire({
                title: 'User not found',
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
                title: 'Succesfully Login',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
             setData({username:"",email:"",password:""})

             sessionStorage.setItem("login",true);
             sessionStorage.setItem("email",email);
             sessionStorage.setItem("name",username);
             
            //  history.push({
            //     pathname: '/Recipe',
            //     state: {  // location state
            //         email:email,
            //         name:username
            //     }
            // })

            navigate("/");
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
         
            <div className="container text-center pt-2" style={{flexGrow:"1"}}>
                <h1>Login</h1>
            </div>

            <div className="container  bg-light my-2 mx-auto mt-5 border" style={{width:w,zIndex:3}}>
                <form method="POST" className="form py-4" onSubmit={handleSubmit}>
                    <label className="form-label m-1">Name</label><input type="text" className="form-control " name="username" value={formData.username} placeholder="Enter your name" required onChange={change}/>               
                    <label className="form-label my-2">Email</label><input type="email"  name="email" value={formData.email} className="form-control " placeholder="Enter your email" required onChange={change} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small><br/>
                    <label className="form-label my-2">Password</label><input type="password"  name="password" value={formData.password} className="form-control " placeholder="Enter your password" required onChange={change}/>
                    <small id="PasswordHelp" className="form-text text-muted">Password is remain always safe.</small><br/>
                    <small id="PasswordHelp" className="form-text text-muted">Not register</small> <NavLink to='/Register' className='form-text text-danger'>Click here</NavLink><br/>
                    <div className="my-3 text-center"><button className="btn btn-danger form-control" type="submit">Login</button></div>
                </form>
            </div>
           
        </div>
    )
}

export default Login
