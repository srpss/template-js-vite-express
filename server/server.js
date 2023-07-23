const express = require('express')

const cors = require('cors')

const mongoose = require('mongoose');
const { User } = require('./Schemas/userSchema');
const { Record } = require('./Schemas/recordSchema');


const app = express()
const port = 3000
const SITE_DB_NAME ='SITE'

app.use(express.static('public'))

app.get('/api/records/:page', (req, res) => {
})

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/defects', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/auth', (req, res) => {
})

app.post('/api/register', (req, res) => {
 
})

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${SITE_DB_NAME}`);
}

const testSchema = new mongoose.Schema({
  name: String
});

const Test = mongoose.model('Test', testSchema);

async function createTest(){
  const silence = new Test({ name: 'Silence' });
  await silence.save();
  console.log(silence.name); // 'Silence'
}

async function find(){
  const result = await Test.find({ name: /^Silence/ });
  console.log(result)
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// find().catch(err => console.log(err));
