const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const exp=require('constants')
const {urlencoded} = require('body-parser')


const app=express();


app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


mongoose.connect('mongodb://localhost:27017/contacts');
const db=mongoose.connection

db.on('error',()=>{
    console.log("Error in connecting to databse");
})

db.once('open',()=>{
    console.log("Connected to database");
})


app.post("/information",(req,res)=>{
   var name=req.body.name;
   var email=req.body.email;
   var subject=req.body.subject;
   var message=req.body.message;

    var data={
        "name":name,
        "email":email,
        "subject":subject,
        "message":message

    }

    db.collection('info').insertOne(data,(err,coolection)=>{
        if(err){
            throw err;
        }
        console.log("Entry inserted successfully");
    });
    return res.redirect('information_recieved.html')
})






app.get('/',(req,res)=>{
    res.set({
        "Allow-access-origin" : '*'
    })

    return res.redirect('index.html')
})

app.listen(3000,()=>{
    console.log('server is listening at http://localhost:3000');
})

