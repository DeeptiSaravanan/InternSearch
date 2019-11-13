const { saltHashPassword } = require('../store')

exports.up = async function up (knex) {
  await knex.schema.table('prof', t => {
    t.string('salt').notNullable()
    t.string('encrypted_password').notNullable()
  })
  const profs = await knex('prof')
  await Promise.all(profs.map(convertPassword))
  await knex.schema.table('prof', t => {
    t.dropColumn('password')
  })

  function convertPassword (prof) {
    const { salt, hash } = saltHashPassword(prof.password)
    return knex('prof')
      .where({ id: prof.id })
      .update({
        salt,
        encrypted_password: hash
      })
  }
}

exports.down = function down (knex) {
  return knex.schema.table('prof', t => {
    t.dropColumn('salt')
    t.dropColumn('encrypted_password')
    t.string('password').notNullable()
  })
}
