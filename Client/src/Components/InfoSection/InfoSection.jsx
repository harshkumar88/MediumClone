import React, { useEffect, useState } from 'react'
import Navbar from "../HomePage/Navbar"
import { ArrowRight } from 'react-bootstrap-icons';
import { NavLink, useLocation } from 'react-router-dom';

const InfoSection=(props)=>{
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [check, set] = useState(false);
    const [storyData, setData] = useState([]);
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

    const showStory = async (em) => {

        const res = await fetch("/showStory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json();
        console.log(data)
     
        if (data.message == 'error') {

        }
        else {
            const arr = [];
            //  console.log(data.message)
            
                 const story=location.state.story;
                 
                data.message.map((ele, id) => {
                    console.log(ele)
                    if(ele.name===story.name && ele.title===story.title && ele.desc===story.desc && ele.date===story.date){
                        
                        arr.push(ele);
                        return;
                    }
                    // arr.push(ele)
                })
                console.log(arr);
                setData(arr);
                set(true);
           

           
        }
    }
    useEffect(() => {

        var viewport_width = window.innerWidth;
  
        if (viewport_width <= 700) {
          setSize(true);
        }
        else {
          setSize(false)
          
        }

        const email = sessionStorage.getItem("email");

        setEmail(email);
        showStory(email);
        
    }, [])

    return (
        <div className='w-100'>
            <Navbar />
            {check == false ? <div>You have Nothing in your story</div> :

                <div  className={size==false?"container-fluid w-75 ":"container-fluid w-100"} style={{overflow:"hidden"}}>
                    {storyData.map((ele, id) => {
                        return <div key={id} className="mt-4 p-1 w-75 mx-auto  container-fluid"> 
                         <h1>{ele.title}</h1>
                         <h6 style={{ marginLeft: "25px" }}><span style={{fontSize:"20px"}}>@</span><span className='text-danger' style={{fontWeight:"bold"}}>{ele.name}</span> </h6><h5 style={{ marginLeft: "40px" }}>{ele.desc}</h5><p style={{ fontSize: "15px" ,marginLeft: "50%" }}>{ele.date}</p></div>
                    })}

                </div>

            }
        </div>
    )
}

export default InfoSection