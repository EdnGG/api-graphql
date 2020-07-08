'use strict'

const { MongoClient } = require('mongodb')
const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  // DB_PORT,
  DB_NAME
} = process.env

// const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

// const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@test-qgluq.mongodb.net/test?retryWhites=true&w=majority`

// const mongoUrl =`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/test`

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;


let connection;

async function connectDB() {
  if (connection) return connection.db()

  let client
  try {
    client = new MongoClient(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    )
    connection = await client.connect()

    // connection = await client.db(DB_NAME)
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error)
    process.exit(1)
  }

  return connection.db()
}

module.exports = connectDB
