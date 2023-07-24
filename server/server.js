const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const { User } = require('./Schemas/userSchema');
const { Record } = require('./Schemas/recordSchema');

const app = express()
const port = 3000
const SITE_DB_NAME = 'SITE'
const RECORDS_PER_PAGE = 10
const MAX_RECORDS = 20

app.use(cors())
app.use(express.json());
app.use(express.static('public'))

app.get('/api/records/:page', async (req, res) => {
  try {

    const countOfRecords = await Record.count();
    const numberOfPages = Math.ceil(countOfRecords / RECORDS_PER_PAGE)
    const page = Number(req.params.page);


    if (typeof (page) != "number") {
      page = 1;
    }

    const records = await Record.find()
      .sort({ date: -1 })
      .skip(page * RECORDS_PER_PAGE - RECORDS_PER_PAGE)// Starting Row
      .limit(page * RECORDS_PER_PAGE) // Ending Row

    res.status(200).send({ records, countOfRecords, numberOfPages })
  } catch (error) {
    res.status(501).send(error)
  }
})

app.post('/api/records', async (req, res) => {
  try {

    const record = new Record({ title: req.body.title, author: req.body.author, body: req.body.body });
    await record.save();
    const records = await Record.count();
   
    if (records > MAX_RECORDS) {

      Record
        .deleteOne().then((result) => {
          console.log(result)
        });
    }
    res.status(200).send()
  } catch (error) {

    res.status(501).send(error)
  }

})

app.delete('/api/records', async (req, res) => {
  try {

    const recordForDelete = await Record.deleteOne({ title: req.body.title }).then((result) => {
      //console.log(result); example
    });
    res.status(200).send()
  } catch (error) {
    res.status(501).send(error)
  }

})


app.post('/api/auth', async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name })
    if (user != null) {
      if (user.password == req.body.password) {
        res.status(200).send(user.name + "+")
      }
      else {
        res.status(401).send()
      }
    }
    else {
      res.status(401).send()
    }
  } catch (error) {
    res.status(501).send(error)
  }
})

app.post('/api/register', async (req, res) => {
  try {

    const user = new User({ name: req.body.name, password: req.body.password });

    await user.save();

    res.status(200).send()

  } catch (error) {
    res.status(501).send(error)
  }

})

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${SITE_DB_NAME}`);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// find().catch(err => console.log(err));
