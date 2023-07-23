const mongoose = require('mongoose')
const { Schema } = mongoose;

const recordSchema = new Schema({
  title: {type: String, required: true, unique: true}, // String is shorthand for {type: String}
  author: {type: String ,required: true},
  body: {type: String ,required: true},
  comments: [{ body: String, author: String, date: Date }],
  date: { type: Date, default: Date.now }
});

const Record = mongoose.model('Record', recordSchema);
module.exports = Record;