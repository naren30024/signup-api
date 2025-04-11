var express = require("express")
var bcrypt = require("bcrypt")
var mysql = require("mysql")
var app = express()

app.use(express.json())

var connection = mysql.createConnection({
    username:"",
    password:"",
    database:"",
    port:"",
})


app.post("/register",(req,res) =>{
    const {userName, email, password} = req.body;
    if(length(password) < 8){
        res.send({"data":"password too short"})
    }
    const checkUserquery = `select * from users where email=${email}`
    const checkUser = con.query(checkUserquery);
    if(checkUser){
        res.send({"data":"user already exist"})
    }
    const hashedPassword = bcrypt.hash(password,10);
    const queryRegister = `inser into users('username','email','password') values (${userName}, ${email}, ${password})`
    
    connection.query(queryRegister,(Error,result)=>{
        if(Error){
            throw Error;
        } 

        res.status(200);
        res.send(result.json())
    });
    
   
})
