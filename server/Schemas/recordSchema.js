import mongoose from 'mongoose';
const { Schema } = mongoose;

const recordSchema = new Schema({
  title: {String, required: true, unique: true}, // String is shorthand for {type: String}
  author: {String ,required: true},
  body: {String ,required: true},
  comments: [{ body: String, author: String, date: Date }],
  date: { type: Date, default: Date.now }
});

export const Record = mongoose.model('Record', recordSchema);