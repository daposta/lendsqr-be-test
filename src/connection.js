
// const knexConfig = require('./db/knexfile');
// console.log(knexConfig)

const knexfile  = require('./db/knexfile')

const db = require('knex')(knexfile[process.env.NODE_ENV])

module.exports = db 