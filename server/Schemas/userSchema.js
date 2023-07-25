const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type: String, required: true, unique: true, maxLength: 6},
  password: {type: String , required: true, maxLength: 6},
  role:{type:String, required:true, enum: ['admin', 'user'] }
});

const User = mongoose.model("User", userSchema);
module.exports = {User};