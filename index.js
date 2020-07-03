'use strict'
require('dotenv').config()

const { graphql, buildSchema } = require('graphql')
const express = require('express')
const gqlMiddleware = require('express-graphql')


const app = express()
const PORT = process.env.PORT || 3000

// Definiendo schema
const schema = buildSchema(`
type Query {
  hello: String
  greetings: String
}
`)

// Configurar los resolvers
const resolvers = {
  hello: () => {
    return 'Hello world'
  },
  greetings: () => {
    return 'How are you?'
  }
}

app.use('/', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`Server listen on port http://localhost:${process.env.PORT}/api`)
})


// // Ejecutar el primer Hello
// graphql(schema, '{ greetings }', resolve).then((data) => {
//   console.log(data)
// })