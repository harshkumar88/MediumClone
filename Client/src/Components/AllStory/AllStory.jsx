import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from "../HomePage/Navbar"
import { ArrowRight } from 'react-bootstrap-icons';
import '../Loader.css'
const AllStory = () => {
    const [email,setEmail]=useState("");
    const [check,set]=useState();
    const [storyData,setData]=useState([]);
    

    const showStory=async(em)=>{

        const res=await fetch("/AllStory",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
              email:em
         })
        })
        const data=await res.json();
     
       
               const arr=[];
              //  console.log(data.message)
                data.message.map((ele,id)=>{
                  arr.push(ele)
                })
                setData(arr);
                set(true);

                if(arr.length==0)set(false)
          
    }
    useEffect(()=>{
   
           const email=sessionStorage.getItem("email");
          
           setEmail(email);
           showStory(email);
   },[])

  return (
    <div>
     <Navbar/>
    {check==false?<div className='mt-5 text-center '><h1>You have Nothing in your story</h1></div>:

    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}} className="container">
    {storyData.map((ele, id) => {
      return <div key={id} className="mt-4 p-1 w-75 mx-auto  container-fluid"> 
       <h1>{ele.title}</h1>
       <h6 style={{ marginLeft: "25px" }}><span style={{fontSize:"20px"}}>@</span><span className='text-danger' style={{fontWeight:"bold"}}>{ele.name}</span>  <NavLink  key={"/InfoSection"}
       to="/InfoSection"
       state={{ story:ele }}
       ><ArrowRight color="royalblue" size={30} style={{marginLeft:"35%"}}/></NavLink></h6><h5 style={{ marginLeft: "40px" }}>{ele.desc.substring(0,100)}....</h5><p style={{ fontSize: "15px" ,marginLeft: "35%" }}>{ele.date}</p></div>
  })}
    
    </div>

}
    </div>
  )
}

export default AllStory