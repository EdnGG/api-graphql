'use strict'
require('dotenv').config()

// const { buildSchema } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools') // Wrapper de graphqlnp
const express = require('express')
const cors = require('cors') //middleware
const gqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const PORT = process.env.PORT || 3000
const isDev = process.env.NODE_ENV !== 'production'

// Definiendo schema

const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Con buildSchema
// const schema = buildSchema(
//   readFileSync(
//     join(__dirname, 'lib', 'schema.graphql'),
//     'utf-8'
//   )
// )

app.use(cors())

app.use('/', gqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
}))

app.listen(PORT, () => {
  console.log(`Server listen on port http://localhost:${process.env.PORT}/api`)
})

