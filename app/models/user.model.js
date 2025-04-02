const mongoose = require("mongoose");
const { Int } = require("mssql");

const userSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true
  },
  Age : {
    type:String
  },
  Message : {
    type:String,
    maxLength:50
  },
  gender:{
    type:String
  },
  email:{
    type:String,
    unique:true
  },
  contact:{
    type:String,
    unique:true
  },
  Status: {
    type: String
  }
}, { timestamps: true });//ts passed as 2nd arg only

//Here : took an extra var
const user  = mongoose.model("user", userSchema);
module.exports= user
// module.exports= mongoose.model("user", userSchema);
