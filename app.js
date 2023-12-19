const AppRoutes=require("./routes/AppRoutes");
const mongoose=require("mongoose");
const cors=require("cors");
const express=require('express');
//init
const app=express();
const PORT=3030;
//const MONGODB_URL='mongodb://127.0.0.1:27017/batch9july';
const MONGODB_URL='mongodb+srv://admin:admin123@zomatoclone.ra8nwr4.mongodb.net/batch9july?retryWrites=true&w=majority'
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api",AppRoutes);
mongoose.connect(MONGODB_URL).then(()=>{
    console.log("database connected successfully");
    app.listen(PORT,()=>{
        console.log("Project is running on port",PORT);
    })
}).catch((err)=>{
    console.log(err);
})
