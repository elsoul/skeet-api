import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import express from 'express'
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
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled'
import { sleep } from '@/utils/time'
import { getLoginUser } from '@/graphql/authManager/login'
import { User } from 'nexus-prisma'

interface Context {
  user?: User
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

export const server = new ApolloServer<Context>({
  schema: applyMiddleware(schema, permissions),
  cache: new InMemoryLRUCache({
    maxSize: Math.pow(2, 20) * 100,
    ttl: 300_000,
  }),
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
  ],
  validationRules: [depthLimit(7), queryComplexityRule],
  introspection: true,
})

const allowedOrigins = ['http://localhost:4000', 'https://example.skeet.dev']
new Array(10).fill(0).forEach((_, i) => {
  allowedOrigins.push(`http://localhost:1900${i}`)
})

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
}

export const startApolloServer = async () => {
  await server.start()
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(corsOptions),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        user: await getLoginUser(String(req.headers.authorization)),
        prisma,
      }),
    })
  )
}

export const expressServer = httpServer.listen(PORT, async () => {
  await startApolloServer()
  if (process.argv[2]) {
    await sleep(1000)
    process.exit()
  }
  console.log(
    `🚀 [API:${skeetEnv}]Server ready at http://localhost:${PORT}/graphql`
  )
})
