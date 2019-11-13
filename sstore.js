//const crypto = require('crypto')
const knex = require('knex')(require('./knexfile'))
var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;

//GLOBAL.document = new JSDOM("http://localhost:7000").window.document;

module.exports = {
  searchIntern({ field}) {
    console.log(`Search intern for ${field}`)
   
    
    //return knex.raw('select * from intern where intern.field = field') //write function for searching
    /*knex.from('intern').select('id','title').where('field', field)
    .then((rows) => {
        for (row of rows) {
    
            console.log(`${row['id']} ${row['title']}`);
        }
    })
    .catch((err) => { console.log( err); throw err })
    .finally(() => {
        knex.destroy();
    });*/
    
    knex.from('prof').select('id','username').where('id', knex.from('intern').select('id').where('field', field))
    .then((rows) => {
        for (row of rows) {
            console.log(`${row['id']} ${row['username']}`);
        }
    })
    .catch((err) => { console.log( err); throw err })
    .finally(() => {
        knex.destroy();
    });
    /*knex.select('*')
	.from(function () {
		this.select('*').from('intern').where('field', field).as('t1');
	})
	.join(
        knex('prof').as('t2') ,function () {
		this.on('t1.id', '=', 't2.id');
	})*/
    /*knex.select('*').from('prof').join('intern', prof.id,'=', intern.id)
    .then((rows) => {
        for (row of rows) {
            console.log(`${row['id']} ${row['username']} ${row['title']}`);
        }
    })
    .catch((err) => { console.log( err); throw err })
    .finally(() => {
        knex.destroy();
    });*/
      
  }
}




