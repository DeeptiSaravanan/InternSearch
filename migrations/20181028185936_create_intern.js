exports.up = function (knex) {
  return knex.schema.createTable('intern', function (t) {
    t.integer('id').notNullable()
    t.string('title').notNullable()
    t.string('field').notNullable()
    t.string('description').notNullable()
    t.timestamps(false, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('intern')
}
