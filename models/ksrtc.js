const mongoose=require("mongoose")
const schema=mongoose.Schema(
    {
        "name":{type:String,required:true},
        "email":String,
        "phoneno":String,
        "gender":String,
        "password":String
        
    }
)
let ksrtcmodel=mongoose.model("users",schema)
module.exports={ksrtcmodel}
