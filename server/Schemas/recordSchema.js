const mongoose = require('mongoose')
const { Schema } = mongoose;

const recordSchema = new Schema({
  title: {type: String, required: true, unique: true, maxLength: 10}, 
  author: {type: String ,required: true, maxLength: 6},
  body: {type: String ,required: true, maxLength: 100},
  comments: [{ body: String, author: String, date: Date }],
  date: { type: Date, default: Date.now }
});

const Record = mongoose.model("Record", recordSchema);
module.exports = {Record};