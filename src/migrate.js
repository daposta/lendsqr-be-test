const Knex = require('knex')
// const knex = require('./db/knexfile');
require('dotenv').config()

// You can dynamically pass the database name
// as a command-line argument, or obtain it from
// a .env file
const databaseName = process.env.DB_NAME


const connection = {
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD
  }
  


async function main() {

    let knex = Knex({
        client: 'mysql',
        connection
    })
 
  // Lets create our database if it does not exist
  const db = await knex.raw('CREATE DATABASE IF NOT EXISTS ??',databaseName )
  console.log('createdb')
  

   // Now that our database is known, let's create another knex object
  // with database name specified so that we can run our migrations
  knex = Knex({
    client: 'mysql',
    connection: {
      ...connection,
      database: databaseName,
    } ,
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/db/migrations'
    },
  })

  

  // Now we can happily run our migrations
  await knex.migrate.latest()

  // Done!!
}

main().catch(console.log).then(process.exit)