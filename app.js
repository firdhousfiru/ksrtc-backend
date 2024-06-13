const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {ksrtcmodel} = require("./models/ksrtc")
const jwt=require("jsonwebtoken")

mongoose.connect("mongodb+srv://firdhouskh:kunjumol@cluster0.h3qcl.mongodb.net/ksrtcdb?retryWrites=true&w=majority&appName=Cluster0")
let app = express()
app.use(cors())
app.use(express.json())


app.post("/login", (req, res) => {
    let input = req.body
    ksrtcmodel.find({ "email": req.body.email }).then(
        (response) => {
           //console.log(response)
            if (response.length > 0) {
let dbPassword=response[0].password
console.log(dbPassword)
bcrypt.compare(input.password,dbPassword,(error,isMatch)=>{
    if (isMatch)
        {
            jwt.sign({email:input.email},"ksrtc-app",{expiresIn:"1d"},
                (error,token)=>{
                    if(error)
                        {
                            res.json({"status":"unable to create token"})
                        }
                        else{
                            res.json({"status":"success","userid":response[0]._id,"token":token})
                        }
                }
            )
        }
else{
    res.json({"status":"inncorrect password"})
}
})
}
        else {
res.json({"status":"user not found"})
           }
        }
    ).catch()
    //res.json({"status":"success"})
})

app.listen(4040, () => {
    console.log("SERVER STARTED")
})
