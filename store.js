const crypto = require('crypto')
const knex = require('knex')(require('./knexfile'))
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

GLOBAL.document = new JSDOM("http://localhost:7000").window.document;

module.exports = {
  createUser ({ username, password, category}) {
    console.log(`Add user ${username} ${category}`)
    const { salt, hash } = saltHashPassword({ password })
    //var c = document.getElementByName("category1").value;
    if(category == "student")
    return knex('user').insert({
      salt,
      encrypted_password: hash,
      username
    })
    else
    return knex('prof').insert({
      salt,
      encrypted_password: hash,
      username
    }) 
  },
  authenticate ({ username, password, category}) {
    console.log(`Authenticating user ${username} ${category}`)
    if(category == "student")
    return knex('user').where({ username })
      .then(([user]) => {
        if (!user) return { success: false }
        const { hash } = saltHashPassword({
          password,
          salt: user.salt
        })
        return { success: hash === user.encrypted_password }
      })
    else
    return knex('prof').where({ username })
      .then(([prof]) => {
        if (!prof) return { success: false }
        const { hash } = saltHashPassword({
          password,
          salt: prof.salt
        })
        return { success: hash === prof.encrypted_password }
      })
  }
}

function saltHashPassword ({
  password,
  salt = randomString()
}) {
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
  return {
    salt,
    hash: hash.digest('hex')
  }
}

function randomString () {
  return crypto.randomBytes(4).toString('hex')
}
