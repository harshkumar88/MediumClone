const express = require('express');
const router = express();
const bp = require("body-parser");
const validator = require('validator');
router.use(bp.json());
router.use(bp.urlencoded({ extended: true }));
require("./database.js");
const { Register, Story } = require("./collections.js");
const bcrypt = require('bcryptjs');

router.post("/registerData", async (req, res) => {
    const { username, email, password, confirmpass } = req.body;
    if (username !== "" && email !== "" && password !== "" && confirmpass !== "") {

        try {
            if (!validator.isEmail(email)) {
                return res.status(422).json({ error: "emailrejected" });
            }
            if (!validator.isStrongPassword(password)) {
                return res.status(422).json({ error: "passwordrejected" });
            }

            const userdata = await Register.find({})
            const finduser = userdata.find((user) => {
                return user.email === email
            })

            if (finduser) {
                return res.status(422).json({ error: "UserExist" });
            }

            const register = new Register({
                username, email, password, confirmpass
            })
            
            await register.save();
            return res.status(201).json({ message: 'Sucess' })
        }
        catch (e) {
            res.json(e);
        }
    }
    else {
        return res.status(422).json("");
    }
})

router.post("/LoginData", async (req, res) => {
    const { username, email, password } = req.body;

    if (username !== "" && email !== "" && password !== "") {
        try {
            const userdata = await Register.find({})
            const finduser = userdata.find((user) => {
                return user.email === email
            })
            

            if (finduser === undefined) {
                return res.status(422).json({ error: 'UserNotFound' })
            }

            const isMatch=await bcrypt.compare(password,finduser.password);
        
            if (!isMatch) {

                return res.status(422).json({ error: "passwordincorrect" });
            }
            else {
                return res.status(201).json({ message: "Success" });
            }



        } catch (error) {
            return res.send("error")

        }
    }
    else {
        return res.status(422).json("");
    }
})

router.post("/AddStory",async(req,res)=>{

     const {date,title,desc,email,name}=req.body;  

     const userdata = await Story.find({});
     const finduser = userdata.find((user) => {
                return user.email === email;
            })
     let data=[];

     if(finduser===undefined){
        data.push({"title":title,"desc":desc,date:date,name:name});
     }
     else{
            let arr=finduser.StoryData;

            arr.map((ele,id)=>{
                data.push(ele);
            })

            data.push({"title":title,"desc":desc,date:date,name:name});

            const deleteuser=await Story.findOneAndDelete({email:email});
     }

     const story=new Story({
          email,StoryData:data
     })

     await story.save();
     console.log(story)
     return res.status(201).json({ message: 'Sucess' })

})

router.post("/MyStory",async(req,res)=>{

    try{
    const email=req.body.email


    const userdata = await Story.find({});
    const finduser = userdata.find((user) => {
               return user.email === email;
           })
    var data=[];

    if(finduser===undefined){
        return res.status(404).json({ message: "error" })
    }
    else{
           let arr=finduser.StoryData;

           arr.map((ele,id)=>{
               data.push(ele);
           }) 
    }

    return res.status(201).json({ message: data })
    }
    catch(e){
       return res.end(e);
    }
})

router.post("/AllStory",async(req,res)=>{

    try{
   
        const {email}=req.body;
    const userdata = await Story.find({});

    const User=userdata.filter((user)=>{
        return user.email!==email
    })
    
    var data=[];

       User.map((user)=>{
           user.StoryData.map((ele,id)=>{
               data.push(ele);
           })
       })
    return res.status(201).json({ message: data })
    }
    catch(e){
       return res.end(e);
    }
})

router.post("/showStory",async(req,res)=>{

    try{
   
    const userdata = await Story.find({});

    var data=[];

       userdata.map((user)=>{
           user.StoryData.map((ele,id)=>{
               data.push(ele);
           })
       })
    return res.status(201).json({ message: data })
    }
    catch(e){
       return res.end(e);
    }
})

router.post("/DeleteStory",async(req,res)=>{

    try{
     
        const {email,ele}=req.body;
    const userdata = await Story.find({});

    const finduser=userdata.find((user)=>{
        return user.email==email;
    })

    var data=[];
    const arr=finduser.StoryData;
     
    data=arr.filter((el,id)=>{
        
        if(el.title===ele.title && el.desc===ele.desc && el.date===ele.date && el.name===ele.name){
            
        }
        else{
            return ele;
        }
    })
    
    const deleteuser=await Story.findOneAndDelete({email:email});

    const story=new Story({
        email,StoryData:data
   })

    
   await story.save();
    
    return res.status(201).json({ message: data })
    }
    catch(e){
       return res.end(e);
    }
})

module.exports = router;