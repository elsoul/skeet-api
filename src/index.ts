import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core'
import { schema } from '@/schema'
import { applyMiddleware } from 'graphql-middleware'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'

const prisma = new PrismaClient()

const PORT = process.env.PORT || 4000
const skeetEnv = process.env.SKEET_ENV || 'development'

export const server = new ApolloServer({
  schema: applyMiddleware(schema),
  cache: new InMemoryLRUCache({
    maxSize: Math.pow(2, 20) * 100,
    ttl: 300_000,
  }),
  plugins: [
    skeetEnv === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  context() {
    return {
      prisma,
    }
  },
})

const app = express()
app.use(cors())
app.get('/', (req, res) => {
  res.send('Skeet App is Running!')
})

export const startApolloServer = async () => {
  await server.start()
  server.applyMiddleware({ app })
  return server
}

export const expressServer = app.listen(PORT, () => {
  startApolloServer()
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
})
