import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express, { Request } from 'express'
import { json } from 'body-parser'
import http from 'http'
import { GraphQLError } from 'graphql'
import bodyParser from 'body-parser'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { schema } from '@/schema'
import { applyMiddleware } from 'graphql-middleware'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'
import { permissions } from '@/permissions'
import depthLimit from 'graphql-depth-limit'
import queryComplexity, { simpleEstimator } from 'graphql-query-complexity'

interface Context {
  token?: String
}

const prisma = new PrismaClient()

const PORT = process.env.PORT || 4000
const skeetEnv = process.env.NODE_ENV || 'development'

const queryComplexityRule = queryComplexity({
  maximumComplexity: 1000,
  variables: {},
  // eslint-disable-next-line no-console
  createError: (max: number, actual: number) =>
    new GraphQLError(
      `Query is too complex: ${actual}. Maximum allowed complexity: ${max}`
    ),
  estimators: [
    simpleEstimator({
      defaultComplexity: 1,
    }),
  ],
})
const app = express()
const httpServer = http.createServer(app)
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Skeet App is Running!')
})
app.use('*', (req: Request, res, next) => {
  if (req.body) {
    const body = JSON.stringify(req.body)
    if (body.length > 2000) {
      throw new Error('Query too large!')
    }
  }
  next()
})

export const server = new ApolloServer<Context>({
  schema: applyMiddleware(schema, permissions),
  cache: new InMemoryLRUCache({
    maxSize: Math.pow(2, 20) * 100,
    ttl: 300_000,
  }),
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  validationRules: [depthLimit(7), queryComplexityRule],
})
export const startApolloServer = async () => {
  await server.start()
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token, prisma }),
    })
  )
}

export const expressServer = httpServer.listen(PORT, async () => {
  await startApolloServer()
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
})
