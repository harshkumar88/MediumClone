import React from 'react'

const Lower = () => {

    const arr=[{text:"Single Click info Blog",Des:"This is the test title",date:"01 01 2023" ,Time:"2 min read"},
    {text:"Code With Akky Blog",Des:"Three features Make IOS 16 Great",date:"30 01 2023" ,Time:"2 min read"},
    {text:"Akky Jalcar Blog",Des:"Google's New Programming Language is Called Carbon",date:"04 02 2023",Time:"2 min read"},
    {text:"Code With Smith",Des:"The Pain of the LL Bean Catalog",date:"7 02 2023",Time:"2 min read"},
    {text:"Code with Pro",Des:"We're Not Going to Make it to 2050",date:"8 02 2023",Time:"2 min read"},
    {text:"Code with Harry",Des:"Logistic Collapse",date:"8 02 2023",Time:"2 min read"}]
  return (
    <div className='container mt-5 w-100 bg-light'>
         <h4 style={{textDecoration:"underline"}}>Trending On Medium</h4>

         <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly"}} className="w-100 bg-light">
         { arr.map((ele,id)=>{
            return <div style={{width:"300px"}} className="mt-2 mb-5"> <p> <span style={{fontSize:"25px"}}> {id+1}</span>  {ele.text}</p> <h6>{ele.Des}</h6> <span style={{marginRight:"25px"}}>{ele.date}</span> <span>{ele.Time}</span> </div>
         })}
         </div>
   
    </div>
  )
}

export default Lower