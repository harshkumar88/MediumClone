const mongoose=require("mongoose");

const DB='mongodb+srv://Harsh:HarshBansal@cluster0.ffsv2.mongodb.net/?retryWrites=true&w=majority';
mongoose.set('strictQuery', true)
mongoose.connect(DB,{
    useNewUrlParser: true,
}).then(()=>{
    console.log("connection successfull");
}).catch(()=>{
    console.log("error no connection")
});
