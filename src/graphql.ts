import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-fastify'
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { makeSchema, nullable, objectType, queryType, stringArg } from 'nexus'
import * as path from 'path'

const prisma = new PrismaClient()
const fastify = Fastify({
  logger: true,
})

const apollo = new ApolloServer({
  context: () => ({ prisma }),
  schema: makeSchema({
    sourceTypes: {
      modules: [{ module: '.prisma/client', alias: 'PrismaClient' }],
    },
    contextType: {
      module: path.join(__dirname, 'context.ts'),
      export: 'Context',
    },
    outputs: {
      typegen: path.join(
        __dirname,
        'node_modules/@types/nexus-typegen/index.d.ts'
      ),
      schema: path.join(__dirname, './api.graphql'),
    },
    shouldExitAfterGenerateArtifacts: Boolean(
      process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION
    ),
    types: [
      objectType({
        name: 'User',
        definition(t) {
          t.id('id')
          t.string('name', {
            resolve(parent) {
              return parent.name
            },
          })
        },
      }),
      queryType({
        definition(t) {
          t.list.field('users', {
            type: 'User',
            args: {
              world: nullable(stringArg()),
            },
            resolve(_root, _args, ctx) {
              return ctx.prisma.user.findMany()
            },
          })
        },
      }),
    ],
  }),
})

const app: FastifyInstance = Fastify({})
const port = Number(process.env.PORT) || 3000

apollo.applyMiddleware({ app })

const start = async () => {
  try {
    await app.listen({ port, host: '0.0.0.0' })
    console.log(`Skeet API is running!: http://localhost:${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
