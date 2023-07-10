import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {String, required: true, unique: true}, // String is shorthand for {type: String}
  password: {String}
});

export const User = mongoose.model('User', userSchema);