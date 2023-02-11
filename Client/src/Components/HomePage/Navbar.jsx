import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import './Home.css'

const Navbar = () => {
    const navigate=useNavigate();
    const [check,set]=useState(false);
    const [name,setName]=useState("");
    useEffect(()=>{
        const checkLogin=sessionStorage.getItem("login");
        const email=sessionStorage.getItem("email");
        const name=sessionStorage.getItem("name");
        if(checkLogin==="true"){
             sessionStorage.setItem("writeStory",true);
             set(true);
             setName(name);
            //  alert(name)
        }
   },[])
   const logoutUser=()=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You want's to Logout.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, do it!'
      }).then((result) => {
        if (result.isConfirmed) {
            sessionStorage.clear();
           set(false);
          Swal.fire(
            'Logout!',
            'You are Logout.',
            'success'
          )
          navigate("/")
        }
      })
    
   
   }
  return (
    <div className='bg-light fixedNav'>
                <navbar >
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                        <NavLink  className="nav-link  anchor" aria-current="page" to="/" style={{fontStyle:"oblique",fontWeight:"bolder",fontSize:"30px"}}>
                         Medium
                        </NavLink>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse ms-5" id="navbarSupportedContent">
                            {check==true?
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item ms-5">
                                    <NavLink  className="nav-link  anchor" aria-current="page" to="/MyStory" style={{fontStyle:"oblique",fontWeight:"bolder"}} >
                                        Our Story
                                        </NavLink>
                                    </li>
                                    <li className="nav-item ms-5">
                                    <NavLink  className="nav-link  anchor" aria-current="page" to="/AllStory" style={{fontStyle:"oblique",fontWeight:"bolder"}}>
                                        Others Stories
                                        </NavLink>
                                    </li>

                                    <li className="nav-item ms-5">
                                    <NavLink  className="nav-link  anchor" aria-current="page" to="/WriteStory" style={{fontStyle:"oblique",fontWeight:"bolder"}}>
                                        Create Story
                                        </NavLink>
                                    </li>
                                </ul>:<ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item ms-5 " >
                                <NavLink  className="nav-link  anchor" aria-current="page" to="/MyStory" style={{fontStyle:"oblique",fontWeight:"bolder"}} onClick={(e)=>e.preventDefault()} >
                                    Our Story
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-5" disable>
                                <NavLink  className="nav-link  anchor" aria-current="page" to="/AllStory" style={{fontStyle:"oblique",fontWeight:"bolder"}} onClick={(e)=>e.preventDefault()}>
                                    Others Stories
                                    </NavLink>
                                </li>

                                <li className="nav-item ms-5" disable>
                                <NavLink  className="nav-link  anchor" aria-current="page" to="/WriteStory" style={{fontStyle:"oblique",fontWeight:"bolder"}} onClick={(e)=>e.preventDefault()}>
                                    Create Story
                                    </NavLink>
                                </li>
                            </ul>}
                            {check==false?
                                <form className="d-flex me-5">
                                    <button className="mx-4 button1 btn" type="submit">
                                        <NavLink className="nav-link  anchor" aria-current="page" to="/Login">Login</NavLink></button>
                                    <button className="me-3 button1 btn" type="submit"> <NavLink className="nav-link  anchor" aria-current="page" to="/Register">Register</NavLink></button>
                                </form>
                            :<span  className="nav-link  anchor" aria-current="page" style={{fontStyle:"oblique",fontWeight:"bolder",fontSize:"30px"}}>
                           <img src='https://th.bing.com/th/id/R.e04324c4c16de8ecfae1959194e89b5b?rik=WMWd0BXqfVYyow&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_227643.png&ehk=P4zMEPJ5NQ9erjCrTStGhLW2S5hhsHxFY31p3xvWzEE%3d&risl=&pid=ImgRaw&r=0' style={{width:"20px"}}/> Hi {name}
                           <img src='https://th.bing.com/th/id/OIP.DCbjAoMts1lxP08W_h_uHwHaHa?pid=ImgDet&rs=1' style={{width:"30px",marginLeft:"10px",cursor:"pointer"}} onClick={logoutUser}/>
                           </span>}
                            </div>
                        </div>
                    </nav>
                </navbar>
                <hr/>
            </div>
  )
}

export default Navbar