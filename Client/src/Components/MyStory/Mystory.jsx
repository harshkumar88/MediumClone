import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Navbar from "../HomePage/Navbar"
import { ArrowRight } from 'react-bootstrap-icons';
import { TrashFill} from 'react-bootstrap-icons';
import '../Loader.css'
import Swal from 'sweetalert2'
import '../HomePage/Home.css'

const Mystory = () => {
    const [email,setEmail]=useState("");
    const [check,set]=useState(false);
    const [storyData,setData]=useState([]);
    const [text,setText]=useState("Pls Wait.....");

    const showStory=async(em)=>{

        const res=await fetch("/MyStory",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                 email:em
            })
        })
        const data=await res.json();
    
         if(data.message=='error'){
          setText("Oops! Nothing to Show");
               set(false);
          }
          else{
               const arr=[];
              //  console.log(data.message)
                data.message.map((ele,id)=>{
                  arr.push(ele)
                })
              
                if(arr.length==0)setText("Oops! Nothing to Show");
                else{
               
                setTimeout(()=>{
                  setData(arr);
                    set(true);
                },1000)
            }
          }
    }
    useEffect(()=>{
           const email=sessionStorage.getItem("email");
           setEmail(email);
           showStory(email);
   },[])

   const deleteStory=async(ele)=>{

    const res=await fetch("/DeleteStory",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
           email:email,ele:ele
      })
  })
  const data=await res.json();
             const arr=[];
                console.log(data.message)
                data.message.map((ele,id)=>{
                  arr.push(ele)
                })

                if(arr.length==0){setText("Oops! Nothing to Show");
                 set(false);
                }
                else{
               
                setData(arr);
                set(true);
                
            }
                
           
   }
   const getStory=async(ele)=>{
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You want's to Delete your Story.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          deleteStory(ele);
        Swal.fire(
          'Deleted!',
          'Deleted Successfully',
          'success'
        )
      }
    })
  
   }

  return (
    <div>
     <Navbar/>
    {check==false?<div className='text-center topMargin' ><h1>{text}</h1></div>:
   
    <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}} className="container topMargin">
    {storyData.map((ele, id) => {
      return <div key={id} className="mt-4 p-1 w-75 mx-auto  container-fluid"> 
       <h1>{ele.title}</h1>
       <h6 style={{ marginLeft: "25px" }}><span style={{fontSize:"20px"}}>@</span><span className='text-danger' style={{fontWeight:"bold"}}>{ele.name}</span>  <NavLink  key={"/InfoSection"}
       to="/InfoSection"
       state={{ story:ele}}
       ><ArrowRight color="royalblue" size={30} style={{marginLeft:"35%"}}/></NavLink> <TrashFill color="royalblue" size={30} style={{marginLeft:"5%",cursor:"pointer"}} onClick={()=>getStory(ele)}/></h6><h5 style={{ marginLeft: "40px" }}>{ele.desc.substring(0,100)}....</h5><p style={{ fontSize: "15px" ,marginLeft: "35%" }}>{ele.date}</p></div>
  })}
    
    </div>

}
    </div>
  )
}

export default Mystory