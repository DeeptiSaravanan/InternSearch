const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()
app.use(express.static('public3'))
app.use(bodyParser.json())
app.post('/login', (req, res) => {
  console.log("in app.post")
  store
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
app.listen(7000, () => {
  console.log('Server running on http://localhost:7000')
  console.log('sup')
})
