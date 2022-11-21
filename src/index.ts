import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { User, Profile } from 'nexus-prisma'
import { makeSchema, objectType, queryType } from 'nexus'
import { join } from 'path'

const prisma = new PrismaClient()
export const schema = makeSchema({
  types: [
    queryType({
      definition(t) {
        t.nonNull.list.nonNull.field('users', {
          type: 'User',
          resolve(_, __, ctx) {
            return ctx.prisma.user.findMany()
          },
        })
      },
    }),
    objectType({
      name: User.$name,
      definition(t) {
        t.field(User.id)
        t.field(User.profile)
      },
    }),

    objectType({
      name: Profile.$name,
      definition(t) {
        t.field(Profile.id), t.field(Profile.iconUrl)
      },
    }),
  ],
  outputs: {
    typegen: join(__dirname, '../nexus-typegen.ts'),
    schema: join(__dirname, '../schema.graphql'),
  },
})

const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context() {
    return {
      prisma,
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
