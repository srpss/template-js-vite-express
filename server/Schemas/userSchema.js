const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type: String, required: true, unique: true}, // String is shorthand for {type: String}
  password: {type: String}
});

const User = mongoose.model('User', userSchema);
module.exports = User;