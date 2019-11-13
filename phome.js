const express = require('express')
const bodyParser = require('body-parser')
const pstore = require('./pstore')
const sstore = require('./sstore')
const store = require('./store')
const papp = express()
papp.use(express.static('public1'))
papp.use(express.static('public2'))
papp.use(bodyParser.json())

papp.post('/createIntern', (req, res) => {
  pstore
    .createIntern({
      id: req.body.id,
      title: req.body.title,
      field: req.body.field,
      description: req.body.description
    })
    .then(() => res.sendStatus(200))
})

papp.post('/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      password: req.body.password,
      category: req.body.category
    })
    //.then(() => res.sendStatus(200))
})

papp.post('/searchIntern', (req, res) => {
  sstore
    .searchIntern({
      field: req.body.field
    })
    //.then(() => res.sendStatus(200))
})

papp.post('/login', (req, res) => {
  pstore
    .authenticate({
      username: req.body.username,
      password: req.body.password,
      category: req.body.category
    })
    .then(({ success }) => {
      if (success) res.sendStatus(200)
      else res.sendStatus(401)
    })
})

papp.listen(7000, () => {
  console.log('Server running on http://localhost:7000')
})
