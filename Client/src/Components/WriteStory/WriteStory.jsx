import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../HomePage/Navbar';
import Swal from 'sweetalert2'
import '../HomePage/Home.css'
const WriteStory = () => {
    const navigate=useNavigate();
    const [StoryData, SetData] = useState({
        title:"",
        desc:""
    });
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [size,setSize]=useState(false);

    window.onresize = function () {
      var viewport_width = window.innerWidth;
  
      if (viewport_width <= 700) {
        setSize(true);
      }
      else {
        setSize(false)
        
      }
    };

    useEffect(()=>{

        var viewport_width = window.innerWidth;
  
        if (viewport_width <= 700) {
          setSize(true);
        }
        else {
          setSize(false)
          
        }

        const email=sessionStorage.getItem("email")
        const name=sessionStorage.getItem("name");
           setEmail(email);
           setName(name);
   },[])

    // const [title, SetTitle] = useState();
    // const [Desc, setDesc] = useState();
   const ChangeData=(e)=>{
    
      const name=e.target.name;
      const value=e.target.value;
   
      SetData({...StoryData,[name]:value})
   }
    const SubmitData=async(e)=>{
          e.preventDefault();
    
          const {title,desc}=StoryData ;
          let date = new Date().toDateString();
          const res=await fetch("/AddStory",{
              method:"POST",
              headers:{
                  "Content-Type":"application/json"
              },
              body:JSON.stringify({
                 date,title,desc,email,name
              })
          })
          const data=await res.json();

          if(data.message=='Sucess'){
            SetData({title:"",desc:""});
            Swal.fire({
                title: 'Publish Your Story',
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
              setTimeout(()=>{
                navigate("/Publish")
              },1000)
            
          }
    }
    return (
        <div>
        <Navbar/>
        <div className='container topMargin'>
        
           <form method='POST' onSubmit={SubmitData}>
            {size==false?<div className='text-end'>
                <button className='btn btn-success'   type='submit'>Publish</button>
                </div>:""}
            <div className='text-center mb-5'>
                <h1>Title of the Story</h1>
                <div ><input type="text" className='form-control removeOutline' value={StoryData.title} name="title" required onChange={ChangeData} /></div>
            </div>

            <div className='text-center mt-5'>
                <h3>Description of Story</h3>
                <div style={{ height: "300px" }}><textarea type="text" className='form-control h-100 removeOutline' placeholder='Write your story' required value={StoryData.desc}  name="desc" onChange={ChangeData} /></div>
            </div>
            {size==true?<div className='text-center mt-4'>
                <button className='btn btn-success'   type='submit'>Publish</button>
                </div>:""}
            </form>
        </div>
        </div>
    )
}

export default WriteStory